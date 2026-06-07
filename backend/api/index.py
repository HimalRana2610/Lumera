"""Vercel serverless entry point.

Vercel's Python runtime serves the module-level ASGI ``app``. We add the backend root
to sys.path so the existing ``app.py`` (one level up) can be imported unchanged.
"""
import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app import app  # noqa: E402,F401  (ASGI app served by Vercel)
