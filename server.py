"""
Local dev server with clean-URL rewriting that mirrors Vercel's behavior.

Without this, Python's plain `http.server` returns 404 when the SPA's
`history.pushState` puts the URL at e.g. `/downloads`, because there's no
file literally named `downloads`. Vercel rewrites `/downloads` -> `downloads.html`
automatically; this script does the same locally.

Usage:
    py server.py            # serves on http://localhost:8001
    py server.py 8080       # custom port
"""

import http.server
import os
import socketserver
import sys
from urllib.parse import urlsplit, urlunsplit


class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def send_head(self):
        original_path = self.path
        rewritten = self._maybe_rewrite(original_path)
        if rewritten is not None:
            self.path = rewritten
        return super().send_head()

    def _maybe_rewrite(self, raw_path):
        parts = urlsplit(raw_path)
        url_path = parts.path

        # Already references a file with an extension, leave it alone.
        root, ext = os.path.splitext(url_path)
        if ext:
            return None

        # Translate to a filesystem path to test for existence.
        fs_base = self.translate_path(url_path)

        # If it's a directory, default handler will serve index.html.
        if os.path.isdir(fs_base):
            return None

        # If a file already exists at this exact path, no rewrite needed.
        if os.path.exists(fs_base):
            return None

        # Try .html variant — matches Vercel cleanUrls behavior.
        candidate_path = url_path.rstrip("/") + ".html"
        fs_candidate = self.translate_path(candidate_path)
        if os.path.isfile(fs_candidate):
            return urlunsplit(parts._replace(path=candidate_path))

        return None

    def end_headers(self):
        # Don't let the browser cache stale dev assets between edits.
        self.send_header("Cache-Control", "no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


def main():
    port = 8001
    if len(sys.argv) > 1:
        try:
            port = int(sys.argv[1])
        except ValueError:
            print(f"Invalid port: {sys.argv[1]}", file=sys.stderr)
            sys.exit(2)

    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"SoftLogic local server: http://localhost:{port}")
        print("Clean URLs enabled (/downloads -> downloads.html). Ctrl+C to stop.")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nStopping server.")


if __name__ == "__main__":
    main()
