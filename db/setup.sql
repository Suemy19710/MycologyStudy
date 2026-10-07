-- One-time setup: creates the app's login role and the database. Run as the postgres superuser:
--   psql -U postgres -h localhost -f db/setup.sql
-- psql asks for the postgres password, then for a NEW password for the app role.
-- The new password is typed at a prompt, so it never lands in your shell history or in this file.

\prompt 'New password for role myco_owner: ' app_password

create role myco_owner login password :'app_password';
create database mycologystudy owner myco_owner encoding 'UTF8' template template0;

\connect mycologystudy
-- Extensions need superuser rights, so they are created here rather than in the migration.
create extension if not exists pg_trgm;
create extension if not exists unaccent;
grant create on schema public to myco_owner;

\echo 'Done. Next: run db/migrations/0001_init.sql as myco_owner (see db/README.md).'
