"""Flask server for the portfolio.

Serves the production build from the `dist/` folder.
Build the site first:  npm install && npm run build
Run locally:           python app.py   ->  http://localhost:5000
Production (Render):   gunicorn app:app
"""
import os
from flask import Flask, send_from_directory, abort

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIST_DIR = os.path.join(BASE_DIR, "dist")

app = Flask(__name__, static_folder=None)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if not os.path.isdir(DIST_DIR):
        return (
            "Build not found. Run 'npm install && npm run build' first, then restart this server.",
            500,
        )
    full_path = os.path.join(DIST_DIR, path)
    if path and os.path.isfile(full_path):
        return send_from_directory(DIST_DIR, path)
    if path and "." in os.path.basename(path):
        abort(404)  # missing asset, not a page route
    return send_from_directory(DIST_DIR, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
