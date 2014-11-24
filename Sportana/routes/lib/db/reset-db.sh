#! /bin/bash

psql --file=dropAllTables.sql
psql --file=createTables.sql
psql --file=initTables.sql