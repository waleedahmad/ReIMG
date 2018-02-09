## Installation and Setup
**Clone repository**

`
$ git clone https://github.com/waleedahmad/ReIMG
`

**Installing dependencies**

`
$ npm install
`

or

`
$ yarn install
`

**Database Configuration**

Edit `database/migrations/migrations.sql` file and change database name for your application.

`Drop DATABASE ReIMG;`

`CREATE DATABASE ReIMG;`

`use ReIMG;`

Rename `database/config.example.php` file to `database/config.php`

Edit `database/config.php` file and enter database credentials/

`$host       = "127.0.0.1";`

`$username   = "";`

`$password   = "";`

`$dbname     = "reimg";`

**Running Migrations**

Run `$ php install.php` to create database database and populate config table with migrations.


**Configuring Storage Directory**

After serving your application through XAMPP/MAMP/MAMP and setting up databases, route to 

`/setting.php` uri and update storage directory from application settings. Make sure storage 

directory string is a valid directory and have sufficient permissions to read and write by your
web server.
