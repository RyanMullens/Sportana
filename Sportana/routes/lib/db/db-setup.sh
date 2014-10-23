#! /bin/bash

psql --file=createTables.sql
psql --file=initTables.sql