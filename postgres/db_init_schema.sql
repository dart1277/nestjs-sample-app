-- psql -U postgres -h localhost -p 5432
-- psql -U cx -d msg -h localhost -p 5432

CREATE USER cx WITH PASSWORD 'okok';

CREATE ROLE msg_app;

GRANT msg_app TO cx;

CREATE
DATABASE msg  ENCODING = 'UTF8'
    CONNECTION LIMIT = -1; -- OWNER john;

-- \c msg

-- https://stackoverflow.com/questions/10352695/grant-all-on-a-specific-schema-in-the-db-to-a-group-role-in-postgresql
-- https://dba.stackexchange.com/a/221212


-- debug grant access to a role
-- GRANT USAGE ON SCHEMA web TO msg_app;
--
-- GRANT ALL ON ALL TABLES  IN SCHEMA web TO msg_app;
-- GRANT ALL ON ALL SEQUENCES  IN SCHEMA web TO msg_app;
-- GRANT ALL ON ALL FUNCTIONS  IN SCHEMA web TO msg_app;
-- ? GRANT ALL ON TYPE xxx TO msg_app;
-- GRANT ALL ON ALL SCHEMAS  IN SCHEMA web TO msg_app;


-- list databases with privileges
-- \l
-- show roles for users
-- \du+
-- SELECT * FROM pg_roles;
-- select has_database_privilege('dbname', 'CREATE');

-- all roles user is member of
-- SELECT * FROM pg_authid a WHERE pg_has_role('msg_app', a.oid, 'member');


-- show users
-- SELECT * FROM pg_catalog.pg_user

-- https://dba.stackexchange.com/questions/4286/list-the-database-privileges-using-psql
-- show privileges for a table
-- SELECT grantee, privilege_type
-- FROM information_schema.role_table_grants
-- WHERE table_name='mytable'

-- list privileges
--  \dp+


GRANT CONNECT ON DATABASE msg TO msg_app;
CREATE SCHEMA web;
GRANT USAGE ON SCHEMA web TO msg_app;
GRANT CREATE ON SCHEMA web TO msg_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA org TO username;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA web TO msg_app;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA web TO msg_app;

ALTER DATABASE msg SET search_path TO web; -- set default schema

create table web.test1(id BIGINT PRIMARY KEY, name varchar);

-- GRANT
-- SELECT
-- ON ALL TABLES IN SCHEMA public TO marketing_team;

-- list privileges
-- https://dba.stackexchange.com/questions/315091/how-can-i-list-all-privileges-that-a-postgresql-role-has

-- WITH server_permissions AS (
--     SELECT
--         r.rolname,
--         'Server_Permissions' AS "Level",
--         r.rolsuper,
--         r.rolinherit,
--         r.rolcreaterole,
--         r.rolcreatedb,
--         r.rolcanlogin,
--         ARRAY(
--             SELECT b.rolname
--             FROM pg_catalog.pg_auth_members m
--             JOIN pg_catalog.pg_roles b ON m.roleid = b.oid
--             WHERE m.member = r.oid
--         ) AS memberof,
--         r.rolbypassrls
--     FROM pg_catalog.pg_roles r
--     WHERE r.rolname !~ '^pg_'
--     ),
--
--     db_ownership AS (
-- SELECT
--     r.rolname,
--     'DB_Ownership' AS "Level",
--     d.datname
-- FROM pg_catalog.pg_database d, pg_catalog.pg_roles r
-- WHERE d.datdba = r.oid
--     ),
--
--     schema_permissions AS (
-- SELECT
--     'Schema Permissions' AS "Level",
--     r.rolname AS role_name,
--     nspname AS schema_name,
--     pg_catalog.has_schema_privilege(r.rolname, nspname, 'CREATE') AS create_grant,
--     pg_catalog.has_schema_privilege(r.rolname, nspname, 'USAGE') AS usage_grant
-- FROM pg_namespace pn, pg_catalog.pg_roles r
-- WHERE array_to_string(nspacl, ',') LIKE '%' || r.rolname || '%'
--   AND nspowner > 1
--     ),
--
--     table_ownership AS (
-- SELECT
--     'Table Ownership' AS "Level",
--     tableowner,
--     schemaname,
--     tablename
-- FROM pg_tables
-- GROUP BY tableowner, schemaname, tablename
--     ),
--
--     object_permissions AS (
-- SELECT
--     'Object Permissions' AS "Level",
--     COALESCE(NULLIF(s[1], ''), 'public') AS rolname,
--     n.nspname,
--     relname,
--     CASE
--     WHEN relkind = 'm' THEN 'Materialized View'
--     WHEN relkind = 'p' THEN 'Partitioned Table'
--     WHEN relkind = 'S' THEN 'Sequence'
--     WHEN relkind = 'I' THEN 'Partitioned Index'
--     WHEN relkind = 'v' THEN 'View'
--     WHEN relkind = 'i' THEN 'Index'
--     WHEN relkind = 'c' THEN 'Composite Type'
--     WHEN relkind = 't' THEN 'TOAST table'
--     WHEN relkind = 'r' THEN 'Table'
--     WHEN relkind = 'f' THEN 'Foreign Table'
--     END AS "Object Type",
--     s[2] AS privileges
-- FROM
--     pg_class c
--     JOIN pg_namespace n ON n.oid = relnamespace
--     JOIN pg_roles r ON r.oid = relowner,
--     UNNEST(COALESCE(relacl::text[], FORMAT('{%s=arwdDxt/%s}', rolname, rolname)::text[])) acl,
--     REGEXP_SPLIT_TO_ARRAY(acl, '=|/') s
-- WHERE relkind <> 'i' AND relkind <> 't'
--     )
--
-- SELECT
--     "Level",
--     rolname AS "Role",
--     'N/A' AS "Object Name",
--     'N/A' AS "Schema Name",
--     'N/A' AS "DB Name",
--     'N/A' AS "Object Type",
--     'N/A' AS "Privileges",
--     rolsuper::text AS "Is SuperUser",
--         rolinherit::text,
--         rolcreaterole::text,
--         rolcreatedb::text,
--         rolcanlogin::text,
--         memberof::text,
--         rolbypassrls::text
-- FROM server_permissions
--
-- UNION
--
-- SELECT
--     dow."Level",
--     dow.rolname,
--     'N/A',
--     'N/A',
--     datname,
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A'
-- FROM db_ownership AS dow
--
-- UNION
--
-- SELECT
--     "Level",
--     role_name,
--     'N/A',
--     schema_name,
--     'N/A',
--     'N/A',
--     CASE
--         WHEN create_grant IS TRUE AND usage_grant IS TRUE THEN 'Usage+Create'
--         WHEN create_grant IS TRUE AND usage_grant IS FALSE THEN 'Create'
--         WHEN create_grant IS FALSE AND usage_grant IS TRUE THEN 'Usage'
--         ELSE 'None'
--         END,
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A'
-- FROM schema_permissions
--
-- UNION
--
-- SELECT
--     "Level",
--     tableowner,
--     tablename,
--     schemaname,
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A'
-- FROM table_ownership
--
-- UNION
--
-- SELECT
--     "Level",
--     rolname,
--     relname,
--     nspname,
--     'N/A',
--     "Object Type",
--     privileges,
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A',
--     'N/A'
-- FROM object_permissions
-- ORDER BY "Role";