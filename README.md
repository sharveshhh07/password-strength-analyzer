# Password Strength Analyzer

A beginner-friendly web project that evaluates password strength locally in the browser.

## Features

- Checks password length
- Checks uppercase/lowercase letters
- Checks numbers and symbols
- Detects common passwords and predictable patterns
- Calculates a simple 0–100 strength score
- Estimates entropy from the character set
- Gives improvement tips
- Generates stronger random alternatives using `crypto.getRandomValues()`
- Does not send passwords to a server

## Technologies

- HTML
- CSS
- JavaScript

## How to run

Open `index.html` in a browser.

## GitHub Pages

After pushing the project to GitHub:

1. Open the repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`.
5. Save.
6. GitHub will provide a live website link.

## Security note

This is an educational password-strength project. The score is a heuristic, not a guarantee of security. Real applications should use established password-strength libraries and secure authentication practices.
