# data/

This folder holds a **database dump** so every teammate starts from the same
tables and starter data.

## Make the dump (one person does this)

1. Get your database into a good starting state. The easy way:

   ```bash
   cd ../api
   yarn generate     # generate the Prisma client
   yarn migrate      # creates the tables
   yarn build        # compile to dist/
   yarn seed         # adds a couple of example games (optional)
   ```

2. In **pgAdmin**, right-click your database, choose **Backup...**, and save
   the file here as `scattergories.dump`.

## Restore the dump (everyone else)

1. In **pgAdmin**, create an empty database (for example `scattergories`).
2. Right-click it, choose **Restore...**, and select `scattergories.dump`.
3. Point `api/.env` at that database (see the API README).

Official guide: https://www.pgadmin.org/docs/pgadmin4/latest/backup_and_restore.html

> The dump file itself is not committed here yet - add it once you've created
> it, so `git` tracks the shared starting point.
