dojo-admin-dashboard
=================================

**Installation and Startup**

1. Clone repo:

  ```bash
  git clone git@github.com:reustleco/dojo-admin-dashboard.git
  ```

2. Use node v12.x.

   The micro-frontend build scripts support node 12.  Using other major versions of node *may* work, but is unsupported.  For convenience, this repository includes an .nvmrc file to help in setting the correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Ensure your environment has NPM_AUTH_TOKEN. It should be github personal access token with package:read and package:write permissions

   To create personal access token
   1. Go to Settings > Developer settings > Personal access token
      - Press "Generate new token" and type your password
      - Under select scopes click write:packages checkbox
      - Copy the token
      - Set `NPM_AUTH_TOKEN` environment variable to that personal access token you're copied

4. Install npm dependencies:

   ```bash
   cd dojo-admin-dashboard && npm install
   ```

6. Update the application port to use for local development:

   Default port is 9090. If this does not work for you, update the line `PORT=9090` to your port in all .env.* files


6. Start the dev server:
   ```bash
   npm start
   ```

The dev server is running at `http://localhost:9090 <http://localhost:9090>`_ or whatever port you setup.
