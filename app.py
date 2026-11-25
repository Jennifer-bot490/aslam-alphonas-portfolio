"""Flask server for the portfolio (Render-ready).

Serves the production build from the `dist/` folder.
Build the site first:  npm install && npm run build
Run locally:           python app.py   ->  http://localhost:5000
Production (Render):   gunicorn app:app --bind 0.0.0.0:$PORT
"""
import os

from flask import Flask, abort, jsonify, send_from_directory
from werkzeug.utils import safe_join

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")

app = Flask(__name__, static_folder=None)


@app.get("/healthz")
def healthz():
    """Health check used by Render."""
    return jsonify(status="ok", build_found=os.path.isdir(DIST_DIR))


@app.after_request
def add_headers(resp):
    """Cache hashed build assets for a year; never cache the HTML page."""
    path = getattr(resp, "_asset_path", "")
    if path.startswith("assets/"):
        resp.headers["Cache-Control"] = "public, max-age=31536000, immutable"
    elif resp.mimetype == "text/html":
        resp.headers["Cache-Control"] = "no-cache"
    resp.headers.setdefault("X-Content-Type-Options", "nosniff")
    resp.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
    resp.headers.setdefault("Referrer-Policy", "strict-origin-when-cross-origin")
    return resp


def _file(path):
    resp = send_from_directory(DIST_DIR, path)
    resp._asset_path = path
    return resp


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if not os.path.isdir(DIST_DIR):
        return (
            "Build not found. Run 'npm install && npm run build' first, then restart this server.",
            500,
        )
    safe = safe_join(DIST_DIR, path) if path else None
    if path and safe is None:
        abort(404)  # blocks ../ path traversal
    if safe and os.path.isfile(safe):
        return _file(path)
    if path and "." in os.path.basename(path):
        abort(404)  # missing asset (js, css, png...), not a page route
    return _file("index.html")


@app.errorhandler(404)
def not_found(_):
    return "Page not found", 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
