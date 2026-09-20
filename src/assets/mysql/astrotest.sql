-- SQL Export for databases: astrotest
SET
  FOREIGN_KEY_CHECKS = 0;

SET
  NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS `astrotest` CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `astrotest`;

CREATE TABLE
  `brands` (
    `brands_id` int NOT NULL AUTO_INCREMENT,
    `brands_image` varchar(255) DEFAULT NULL,
    `brands_url` varchar(255) DEFAULT NULL,
    `date_added` datetime DEFAULT NULL,
    `last_modified` datetime DEFAULT NULL,
    PRIMARY KEY (`brands_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `brands_description` (
    `brands_id` int NOT NULL,
    `language_id` int NOT NULL,
    `brands_name` varchar(128) NOT NULL,
    `brands_description` text,
    PRIMARY KEY (`brands_id`, `language_id`),
    KEY `idx_brands_name` (`brands_name`),
    CONSTRAINT `fk_brands_desc_brand` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`brands_id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `categories` (
    `categories_id` int NOT NULL AUTO_INCREMENT,
    `categories_image` varchar(64) DEFAULT NULL,
    `parent_id` int NOT NULL DEFAULT '0',
    `sort_order` int NOT NULL DEFAULT '1',
    `date_added` datetime DEFAULT NULL,
    PRIMARY KEY (`categories_id`),
    KEY `idx_categories_parent_id` (`parent_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 491 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (8, 'smartphones_0775_1920.jpg', 0, 1, NULL);

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    9,
    'background-audio-mixer-1284507_960_720.jpg',
    0,
    1,
    NULL
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    10,
    'microphones-cat-3315985_960_720.jpg',
    9,
    1,
    NULL
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (11, 'headset-cats-8622081_960_720', 9, 1, NULL);

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    100,
    'electronics.jpg',
    0,
    1,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    200,
    'computing.jpg',
    100,
    1,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (210, 'mobile.jpg', 100, 2, '2026-04-22 12:09:51');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    220,
    'smart-home.jpg',
    100,
    3,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (230, 'audio.jpg', 100, 4, '2026-04-22 12:09:51');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    240,
    'wearables.jpg',
    100,
    5,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (300, 'laptops.jpg', 200, 1, '2026-04-22 12:09:51');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    310,
    'desktops.jpg',
    200,
    2,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    320,
    'components.jpg',
    200,
    3,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    330,
    'smartphones.jpg',
    210,
    1,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (340, 'tablets.jpg', 210, 2, '2026-04-22 12:09:51');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    350,
    'accessories.jpg',
    210,
    3,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (400, NULL, 330, 1, NULL);

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (420, NULL, 400, 1, '2026-04-22 12:10:55');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (430, NULL, 400, 2, '2026-04-22 12:10:55');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (440, NULL, 400, 3, '2026-04-22 12:10:55');

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    450,
    'speakers.jpg',
    220,
    1,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    460,
    'lighting.jpg',
    220,
    2,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    470,
    'security.jpg',
    220,
    3,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    480,
    'headphones.jpg',
    230,
    1,
    '2026-04-22 12:09:51'
  );

INSERT INTO
  `categories` (
    `categories_id`,
    `categories_image`,
    `parent_id`,
    `sort_order`,
    `date_added`
  )
VALUES
  (
    490,
    'speakers.jpg',
    230,
    2,
    '2026-04-22 12:09:51'
  );

CREATE TABLE
  `categories_description` (
    `categories_id` int NOT NULL DEFAULT '0',
    `language_id` int NOT NULL DEFAULT '1',
    `categories_name` varchar(32) NOT NULL,
    `categories_description` text,
    PRIMARY KEY (`categories_id`, `language_id`),
    KEY `idx_categories_name` (`categories_name`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    8,
    1,
    'Smartphones',
    'Category Smartphones, description for smartphone category'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    9,
    1,
    'Audio',
    'Audio equipment for professional and home use. Includes microphones, headphones, amplifiers, speakers and general audio equipment and audio accessories.'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    10,
    1,
    'Microphones',
    'Best recording microphones money can buy. Whether you\'re looking for your first recording microphone, or a professional-grade one, we\'ve got you covered.'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    11,
    1,
    'Headephones and Headsets',
    'Best professional Over-Ear Studio Headphones, DJ & Monitor Headphones, for Studio Recording & Mixing and associated accessories, covering the very best class-leading pairs across a variety of styles and budgets.'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    100,
    1,
    'Electronics',
    'All electronic devices and technology'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    200,
    1,
    'Computing',
    'Computers, PCs and hardware'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    210,
    1,
    'Mobile Devices',
    'Phones, tablets and mobile tech'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    220,
    1,
    'Smart Home',
    'Connected home devices and IoT'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    230,
    1,
    'Audio',
    'Headphones, speakers and sound systems'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    240,
    1,
    'Wearables',
    'Smartwatches and wearable tech'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (300, 1, 'Laptops', 'Portable computing devices');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    310,
    1,
    'Desktops',
    'Desktop computers and setups'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (320, 1, 'Components', 'PC hardware components');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (330, 1, 'Smartphones', 'Modern mobile phones');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (340, 1, 'Tablets', 'Tablet devices');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (350, 1, 'Accessories', 'Mobile accessories');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    400,
    1,
    'Android Phones',
    'Android smartphone ecosystem'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (410, 1, 'iPhones', 'Apple smartphone ecosystem');

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    420,
    1,
    'Budget Android',
    'Affordable Android devices'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    430,
    1,
    'Flagship Android',
    'High-end Android devices'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    440,
    1,
    'Gaming Phones',
    'Phones optimized for gaming'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    450,
    1,
    'Smart Speakers',
    'Voice-controlled speakers'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    460,
    1,
    'Smart Lighting',
    'Smart bulbs and lighting systems'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    470,
    1,
    'Home Security',
    'Cameras and smart security systems'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (
    480,
    1,
    'Headphones',
    'Audio headphones and headsets'
  );

INSERT INTO
  `categories_description` (
    `categories_id`,
    `language_id`,
    `categories_name`,
    `categories_description`
  )
VALUES
  (490, 1, 'Speakers', 'Audio speaker systems');

CREATE TABLE
  `configuration` (
    `config_id` int NOT NULL AUTO_INCREMENT,
    `config_key` varchar(100) NOT NULL,
    `config_value` text NOT NULL,
    `config_type` varchar(64) NOT NULL,
    `config_group` varchar(50) DEFAULT NULL,
    `config_description` varchar(255) DEFAULT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `config_selector` varchar(100) DEFAULT NULL,
    PRIMARY KEY (`config_id`),
    UNIQUE KEY `config_key` (`config_key`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    1,
    'checkout.enable_buy_now',
    'false',
    'boolean',
    'checkout',
    'Enable direct buy now checkout for single product purchases',
    '2026-04-17 10:42:20',
    '2026-04-17 10:49:26',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    2,
    'checkout.enable_cart',
    'true',
    'boolean',
    'checkout',
    'Enable shopping cart for product purchases',
    '2026-04-17 10:42:20',
    '2026-04-17 10:49:26',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    3,
    'languages.default',
    '1',
    'table.languages',
    'localization',
    'Default language to be used with this store',
    '2026-04-18 02:23:28',
    '2026-04-18 02:23:28',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    4,
    'products.featured_listing_size',
    '4',
    'number',
    'listings',
    'The number of featured products to show in a listing. Set to 0 to disable',
    '2026-04-20 20:32:16',
    '2026-04-20 20:36:02',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    5,
    'currencies.default',
    '1',
    'table.currencies',
    'localization',
    'Default currency to be used with this store',
    '2026-04-25 22:34:23',
    '2026-04-25 22:34:23',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    6,
    'locale.default',
    'en-US',
    'string',
    'localization',
    'Default locale to be used with this store formatting date, etc',
    '2026-04-25 22:36:16',
    '2026-04-25 22:36:16',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    7,
    'locale.strategy',
    'fixed',
    'string',
    'localization',
    'Locale strategy. Set to fixed to always use default locale. Dynamic will follow currency and language',
    '2026-04-26 01:08:36',
    '2026-04-26 01:08:36',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    8,
    'products.use_extra_fields',
    'true',
    'boolean',
    'checkout',
    'Enable Products Extra Fields in the store',
    '2026-09-15 10:49:26',
    '2026-09-16 17:10:51',
    NULL
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    9,
    'products.page_listing_size',
    '25',
    'number',
    'listings',
    'Pagination - How many items to list per page',
    '2026-09-16 11:08:36',
    '2026-09-17 12:44:51',
    'pageSizeValues'
  );

INSERT INTO
  `configuration` (
    `config_id`,
    `config_key`,
    `config_value`,
    `config_type`,
    `config_group`,
    `config_description`,
    `created_at`,
    `updated_at`,
    `config_selector`
  )
VALUES
  (
    10,
    'theme.default',
    'clean-slate',
    'string',
    'layout',
    'Default theme to be used for new visitors',
    '2026-09-16 11:08:36',
    '2026-09-17 12:44:51',
    'themes'
  );

CREATE TABLE
  `currencies` (
    `currencies_id` int NOT NULL AUTO_INCREMENT,
    `code` varchar(16) NOT NULL,
    `name` varchar(64) NOT NULL,
    `type` enum ('fiat', 'crypto', 'custom') NOT NULL DEFAULT 'fiat',
    `symbol` varchar(16) DEFAULT NULL,
    `symbol_position` enum ('left', 'right') DEFAULT 'left',
    `decimal_places` int NOT NULL DEFAULT '2',
    `rate` decimal(20, 10) NOT NULL DEFAULT '1.0000000000',
    `status` tinyint (1) NOT NULL DEFAULT '1',
    `sort_order` smallint NOT NULL DEFAULT '1',
    PRIMARY KEY (`currencies_id`),
    UNIQUE KEY `code` (`code`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `currencies` (
    `currencies_id`,
    `code`,
    `name`,
    `type`,
    `symbol`,
    `symbol_position`,
    `decimal_places`,
    `rate`,
    `status`,
    `sort_order`
  )
VALUES
  (
    1,
    'USD',
    'US Dollar',
    'fiat',
    '$',
    'left',
    2,
    '1.0000000000',
    1,
    1
  );

CREATE TABLE
  `customers` (
    `customers_id` int NOT NULL AUTO_INCREMENT,
    `customers_firstname` varchar(32) NOT NULL,
    `customers_lastname` varchar(32) NOT NULL,
    `customers_email_address` varchar(96) NOT NULL,
    `customers_default_address_id` int DEFAULT NULL,
    `customers_telephone` varchar(32) NOT NULL,
    `customers_password` varchar(40) NOT NULL,
    `customers_newsletter` char(1) DEFAULT NULL,
    `customers_status` tinyint (1) NOT NULL DEFAULT '1',
    PRIMARY KEY (`customers_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `customers` (
    `customers_id`,
    `customers_firstname`,
    `customers_lastname`,
    `customers_email_address`,
    `customers_default_address_id`,
    `customers_telephone`,
    `customers_password`,
    `customers_newsletter`,
    `customers_status`
  )
VALUES
  (
    1,
    'Mark',
    'Tester',
    'test@example.com',
    1,
    '123-456-789',
    'password',
    '1',
    1
  );

CREATE TABLE
  `customers_basket_fields` (
    `customers_id` int NOT NULL,
    `products_id` int NOT NULL,
    `products_extra_fields_id` int NOT NULL,
    `fields_configuration` json NOT NULL,
    PRIMARY KEY (
      `customers_id`,
      `products_id`,
      `products_extra_fields_id`
    )
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `customers_preferences` (
    `customers_id` int NOT NULL,
    `user_prefs` json NOT NULL,
    PRIMARY KEY (`customers_id`),
    CONSTRAINT `customers_preferences_ibfk_1` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`customers_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `languages` (
    `languages_id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    `code` varchar(10) NOT NULL,
    `image` varchar(64) CHARACTER
    SET
      latin1 COLLATE latin1_swedish_ci DEFAULT '',
      `sort_order` int DEFAULT '0',
      `status` tinyint (1) DEFAULT '1',
      PRIMARY KEY (`languages_id`),
      UNIQUE KEY `code` (`code`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 2 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `languages` (
    `languages_id`,
    `name`,
    `code`,
    `image`,
    `sort_order`,
    `status`
  )
VALUES
  (1, 'English', 'en', 'english.gif', 1, 1);

CREATE TABLE
  `languages_strings` (
    `language_id` int NOT NULL,
    `string_key` varchar(191) NOT NULL,
    `string_value` text NOT NULL,
    PRIMARY KEY (`language_id`, `string_key`),
    CONSTRAINT `fk_language_strings_language` FOREIGN KEY (`language_id`) REFERENCES `languages` (`languages_id`) ON DELETE CASCADE ON UPDATE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `languages_strings` (`language_id`, `string_key`, `string_value`)
VALUES
  (1, 'products.listing.title.all', 'All Products');

INSERT INTO
  `languages_strings` (`language_id`, `string_key`, `string_value`)
VALUES
  (
    1,
    'products.listing.title.brand',
    'Products by {{name}}'
  );

INSERT INTO
  `languages_strings` (`language_id`, `string_key`, `string_value`)
VALUES
  (
    1,
    'products.listing.title.category',
    'Products in {{name}}'
  );

CREATE TABLE
  `order_item_fields` (
    `order_item_field_id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `order_item_id` bigint unsigned NOT NULL,
    `field_name` varchar(255) NOT NULL,
    `field_value` varchar(255) NOT NULL,
    `extra_field_id` int unsigned DEFAULT NULL,
    `extra_index_id` int unsigned DEFAULT NULL,
    PRIMARY KEY (`order_item_field_id`),
    KEY `idx_order_item_fields_order_item` (`order_item_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `order_items` (
    `order_item_id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `orders_id` int unsigned NOT NULL,
    `products_id` int unsigned DEFAULT NULL,
    `products_model` varchar(64) DEFAULT NULL,
    `products_name` varchar(255) NOT NULL,
    `products_price` decimal(15, 4) NOT NULL,
    `final_price` decimal(15, 4) NOT NULL,
    `products_tax` decimal(15, 4) NOT NULL,
    `products_quantity` int unsigned NOT NULL,
    `fields_configuration` json DEFAULT NULL,
    `tracking_number` varchar(128) DEFAULT NULL,
    PRIMARY KEY (`order_item_id`),
    KEY `idx_order_items_order_id` (`orders_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `order_status_history` (
    `order_status_history_id` bigint unsigned NOT NULL AUTO_INCREMENT,
    `orders_id` int unsigned NOT NULL,
    `order_status_id` smallint unsigned NOT NULL,
    `date_added` datetime NOT NULL,
    `customer_notified` tinyint (1) NOT NULL DEFAULT '0',
    `comments` text,
    PRIMARY KEY (`order_status_history_id`),
    KEY `idx_order_status_history_order_date` (`orders_id`, `date_added`),
    KEY `idx_order_status_history_status` (`order_status_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `order_statuses` (
    `order_status_id` smallint unsigned NOT NULL AUTO_INCREMENT,
    `name` varchar(64) NOT NULL,
    `sort_order` smallint unsigned NOT NULL DEFAULT '0',
    PRIMARY KEY (`order_status_id`),
    UNIQUE KEY `uq_order_statuses_name` (`name`),
    KEY `idx_order_statuses_sort_order` (`sort_order`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 6 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `order_statuses` (`order_status_id`, `name`, `sort_order`)
VALUES
  (1, 'Pending', 1);

INSERT INTO
  `order_statuses` (`order_status_id`, `name`, `sort_order`)
VALUES
  (2, 'Processing', 1);

INSERT INTO
  `order_statuses` (`order_status_id`, `name`, `sort_order`)
VALUES
  (3, 'Shipped', 1);

INSERT INTO
  `order_statuses` (`order_status_id`, `name`, `sort_order`)
VALUES
  (4, 'Completed', 1);

INSERT INTO
  `order_statuses` (`order_status_id`, `name`, `sort_order`)
VALUES
  (5, 'Cancelled', 1);

CREATE TABLE
  `orders` (
    `orders_id` int unsigned NOT NULL AUTO_INCREMENT,
    `customers_id` int unsigned NOT NULL,
    `customers_name` varchar(128) NOT NULL,
    `customers_company` varchar(128) DEFAULT NULL,
    `customers_street_address` varchar(255) NOT NULL,
    `customers_suburb` varchar(128) DEFAULT NULL,
    `customers_city` varchar(128) NOT NULL,
    `customers_postcode` varchar(32) NOT NULL,
    `customers_state` varchar(128) DEFAULT NULL,
    `customers_country` varchar(128) NOT NULL,
    `customers_telephone` varchar(32) NOT NULL,
    `customers_email_address` varchar(255) NOT NULL,
    `delivery_name` varchar(128) NOT NULL,
    `delivery_company` varchar(128) DEFAULT NULL,
    `delivery_street_address` varchar(255) NOT NULL,
    `delivery_suburb` varchar(128) DEFAULT NULL,
    `delivery_city` varchar(128) NOT NULL,
    `delivery_postcode` varchar(32) NOT NULL,
    `delivery_state` varchar(128) DEFAULT NULL,
    `delivery_country` varchar(128) NOT NULL,
    `billing_name` varchar(128) NOT NULL,
    `billing_company` varchar(128) DEFAULT NULL,
    `billing_street_address` varchar(255) NOT NULL,
    `billing_suburb` varchar(128) DEFAULT NULL,
    `billing_city` varchar(128) NOT NULL,
    `billing_postcode` varchar(32) NOT NULL,
    `billing_state` varchar(128) DEFAULT NULL,
    `billing_country` varchar(128) NOT NULL,
    `payment_method` varchar(255) NOT NULL,
    `date_purchased` datetime NOT NULL,
    `last_modified` datetime DEFAULT NULL,
    `orders_status` tinyint unsigned NOT NULL,
    `orders_date_finished` datetime DEFAULT NULL,
    `currency` char(3) NOT NULL,
    `currency_value` decimal(14, 6) DEFAULT NULL,
    PRIMARY KEY (`orders_id`),
    KEY `idx_orders_customer_date` (`customers_id`, `date_purchased`),
    KEY `idx_orders_status_date` (`orders_status`, `date_purchased`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `products` (
    `products_id` int NOT NULL AUTO_INCREMENT,
    `products_quantity` int NOT NULL,
    `products_model` varchar(32) DEFAULT NULL,
    `products_image` varchar(64) DEFAULT NULL,
    `products_price` decimal(15, 4) NOT NULL,
    `products_cost` decimal(15, 4) NOT NULL,
    `products_date_added` datetime NOT NULL,
    `products_last_modified` datetime DEFAULT NULL,
    `products_date_available` datetime DEFAULT NULL,
    `products_weight` decimal(5, 2) NOT NULL,
    `products_status` tinyint (1) NOT NULL DEFAULT '1',
    `products_display` tinyint (1) NOT NULL DEFAULT '1',
    `products_tax_class_id` int NOT NULL,
    `products_ordered` int NOT NULL DEFAULT '0',
    PRIMARY KEY (`products_id`),
    KEY `idx_products_date_added` (`products_date_added`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 120 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    105,
    10,
    '531250',
    'admc-smartphone-531250_1920.jpg',
    '49.9500',
    '29.9500',
    '2026-04-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    106,
    10,
    '3876026',
    '3876026_1920.jpg',
    '79.9500',
    '29.9500',
    '2026-03-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    107,
    10,
    '472115',
    'adrian2019-samsung-4721539_1920.jpg',
    '115.9500',
    '76.0000',
    '2026-04-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    108,
    12,
    'LEJ-1013',
    'ajel-iphone6-1013238_1920.jpg',
    '74.9500',
    '52.0000',
    '2026-04-15 00:00:00',
    '2026-04-15 00:00:00',
    NULL,
    '0.20',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    109,
    8,
    '29050',
    'clker-free-vector-images-nexus-one-295050_1920.png',
    '59.9500',
    '49.9500',
    '2026-04-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    110,
    8,
    '47623',
    'elcodigodebarras-iphone-476236_1920.jpg',
    '179.9500',
    '99.9500',
    '2026-03-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    111,
    10,
    '33535',
    'erik_lucatero-technology-3353701_1920.jpg',
    '145.9500',
    '96.0000',
    '2026-04-15 00:00:00',
    NULL,
    NULL,
    '0.25',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    112,
    14,
    '64053',
    'fernandozhiminaicela-smartphone-6405230_1920.jpg',
    '174.9500',
    '152.0000',
    '2026-04-15 00:00:00',
    '2026-04-15 00:00:00',
    NULL,
    '0.20',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    113,
    11,
    'td-whal-22',
    'spk-td-1822630_960_720.jpg',
    '99.9500',
    '35.0000',
    '2026-04-23 15:49:29',
    NULL,
    NULL,
    '1.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    114,
    5,
    'av-821',
    'av-chd-1822632_960_720.jpg',
    '109.9500',
    '69.5500',
    '2026-04-23 16:02:14',
    NULL,
    NULL,
    '25.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    115,
    4,
    'wha-ac-2',
    'wha-ac-.jpg',
    '129.9500',
    '79.9500',
    '2026-04-23 16:23:03',
    NULL,
    NULL,
    '14.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    116,
    7,
    'RC-MEV-4',
    'mev-5-loudspeakers.jpg',
    '159.9500',
    '99.9500',
    '2026-04-23 16:31:17',
    NULL,
    NULL,
    '7.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    117,
    3,
    'Frem-32-1',
    'fl33-rc-hifi0.jpg',
    '395.0000',
    '280.0000',
    '2026-04-23 16:42:09',
    NULL,
    NULL,
    '16.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    118,
    8,
    'HV-5-D2',
    'hv-d-331pass.jpg',
    '55.7500',
    '39.0000',
    '2026-04-23 16:49:29',
    NULL,
    NULL,
    '2.00',
    1,
    1,
    1,
    0
  );

INSERT INTO
  `products` (
    `products_id`,
    `products_quantity`,
    `products_model`,
    `products_image`,
    `products_price`,
    `products_cost`,
    `products_date_added`,
    `products_last_modified`,
    `products_date_available`,
    `products_weight`,
    `products_status`,
    `products_display`,
    `products_tax_class_id`,
    `products_ordered`
  )
VALUES
  (
    119,
    3,
    'MXA-234',
    'alpha-max-1100.jpg',
    '249.9500',
    '125.0000',
    '2026-04-23 17:00:22',
    NULL,
    NULL,
    '11.00',
    1,
    1,
    1,
    0
  );

CREATE TABLE
  `products_description` (
    `products_id` int NOT NULL,
    `language_id` int NOT NULL DEFAULT '1',
    `products_name` varchar(64) NOT NULL,
    `products_description` text,
    `products_url` varchar(255) DEFAULT NULL,
    `products_viewed` int DEFAULT '0',
    PRIMARY KEY (`products_id`, `language_id`),
    KEY `products_name` (`products_name`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    105,
    1,
    'ADMC Smartphone - 2GB Ram 32GB card',
    'High quality smartphone with 2GB Ram and 32GB Flash card',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    106,
    1,
    'XMAS 221-873',
    'An outstanding smartphone with a lots of ram and running android 14',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    107,
    1,
    'ADER-539',
    'The ADER-539 is another prototype smartphone featuring bluetooth and hotspot functionality.',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    108,
    1,
    'LEJ 3238 2GB - 32GB EX',
    'Android 15 phone with NFC ',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    109,
    1,
    'NEXUS Vector - 3GB Ram 64GB card',
    'High quality smartphone with 3GB Ram and 64GB Flash card',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    110,
    1,
    'IPHONE-47',
    'An outstanding smartphone with a lots of ram and running IOS',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    111,
    1,
    'TECHNO-701',
    'The TECHNO-701 is a prototype smartphone featuring modular components and removable battery',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    112,
    1,
    'SZG-MINA 8',
    'A slim design with Android 15 phone and NFC ',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    113,
    1,
    'TD-LC2 Dual-Channel speakers',
    'Full-range main output for speakers and low-pass bass output for subwoofers. It includes BassLift technology to compensate for factory bass roll-off, ensuring rich low frequencies.',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    114,
    1,
    'Asentry Dual Channel Speakers',
    'Professional-grade filtering, two-component target, efficient with one amp channel. Pair matches the e 200W peak rating for four to eight ohm systems and uses a combination of bass inductors with MKP and MPX capacitors for enhanced clarity. The frequency range remains 45 Hz to 25 kHz with division points around 860 Hz and 6 kHz, aligning with standard 3-way configurations to preserve dynamic response across the spectrum.',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    115,
    1,
    'fdale diamond 54 Speakers',
    'Bookshelf Speakers are clear and precise with unmatched sound reproduction at their level. They boast curved, braced cabinets that not only allude to the premium aesthetic qualities of higher-priced speakers but also help to reduce unwanted cabinet vibrations and dissipate derogatory standing waves that can negatively affect your sound.\r\n\r\nThe five-inch Kevlar mid/bass driver and one-inch textile tweeter work effortlessly together, offering sparkling highs and full, controlled lows, revealing details in your favorite tracks that may have previously gone unheard. The gold-plated biwireable binding posts, a trait usually only found at higher cost ranges, ensure complete versatility in your set-up and will benefit those who aim to achieve a precise and clean sound, where high and low frequencies blend harmoniously without a fight for air space. ',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    116,
    1,
    'MEV-5 Bookshelf Speakers ',
    'Bookshelf speakers 136W RMS feature dual 1\" dome tweeters, 5\" woofer to deliver a fuller, more immersive sound stage. Tuned for depth and clarity, they produce rich lows and detailed highs for a truly engaging listening experience',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    117,
    1,
    'Fren-5 HiFi Tower Speaker System',
    'Complete studio solution 4 way speaker system. Powerful speakers designed to deliver deep, dynamic performance without compromise. Designed for home parties, events and creative setups, this set brings reliable power, bold design, and the kind of audio that turns every moment into an unforgettable experience. ',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    118,
    1,
    'HV5 Sound Experience',
    'Whether listening to movies, or music after work, the set provide extreme audio experience. \r\n\r\nIt seamlessly blends precision acoustic engineering with sleek, modern design, redefining the standards of high-end audio',
    NULL,
    0
  );

INSERT INTO
  `products_description` (
    `products_id`,
    `language_id`,
    `products_name`,
    `products_description`,
    `products_url`,
    `products_viewed`
  )
VALUES
  (
    119,
    1,
    'DJ MXA Speaker Twins',
    'Clear, high-frequency response and thumping bass delivering superb audio experience for mobile DJ staging and music venues needing loud, balanced, distortion-free sound.',
    NULL,
    0
  );

CREATE TABLE
  `products_extra_fields` (
    `products_extra_fields_id` int unsigned NOT NULL AUTO_INCREMENT,
    `products_extra_fields_name` varchar(64) NOT NULL,
    `products_extra_fields_order` smallint unsigned NOT NULL DEFAULT '0',
    `products_extra_fields_status` tinyint (1) NOT NULL DEFAULT '1',
    `price_status` tinyint (1) NOT NULL DEFAULT '0',
    `stock_status` tinyint (1) NOT NULL DEFAULT '0',
    `image_status` tinyint (1) NOT NULL DEFAULT '0',
    `blank_rows` smallint unsigned NOT NULL DEFAULT '8',
    `fields_configuration` json NOT NULL,
    PRIMARY KEY (`products_extra_fields_id`),
    KEY `idx_pef_parent_order` (`parent_id`, `products_extra_fields_order`),
    KEY `idx_pef_status` (`products_extra_fields_status`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `products_featured` (
    `products_id` int NOT NULL,
    `start_date` datetime DEFAULT NULL,
    `expires_date` datetime DEFAULT NULL,
    `status` int NOT NULL DEFAULT '1',
    `sort_order` int DEFAULT NULL,
    PRIMARY KEY (`products_id`),
    KEY `idx_sort_order` (`sort_order`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `products_featured` (
    `products_id`,
    `start_date`,
    `expires_date`,
    `status`,
    `sort_order`
  )
VALUES
  (105, '2026-09-03 11:02:00', NULL, 1, 1);

INSERT INTO
  `products_featured` (
    `products_id`,
    `start_date`,
    `expires_date`,
    `status`,
    `sort_order`
  )
VALUES
  (106, '2026-08-12 00:00:00', NULL, 1, 1);

INSERT INTO
  `products_featured` (
    `products_id`,
    `start_date`,
    `expires_date`,
    `status`,
    `sort_order`
  )
VALUES
  (112, '2026-04-17 00:00:00', NULL, 1, 1);

CREATE TABLE
  `products_specials` (
    `products_id` int NOT NULL,
    `special_price` decimal(10, 2) NOT NULL,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL,
    `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`products_id`),
    KEY `start_date` (`start_date`),
    KEY `end_date` (`end_date`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `products_specials` (
    `products_id`,
    `special_price`,
    `start_date`,
    `end_date`,
    `created_at`
  )
VALUES
  (
    108,
    '69.95',
    '2026-04-17 00:00:00',
    '2027-04-17 00:00:00',
    '2026-04-18 19:56:00'
  );

CREATE TABLE
  `products_to_brands` (
    `products_id` int NOT NULL,
    `brands_id` int NOT NULL,
    PRIMARY KEY (`products_id`, `brands_id`),
    KEY `idx_brands` (`brands_id`),
    CONSTRAINT `fk_p2b_brand` FOREIGN KEY (`brands_id`) REFERENCES `brands` (`brands_id`) ON DELETE CASCADE,
    CONSTRAINT `fk_p2b_product` FOREIGN KEY (`products_id`) REFERENCES `products` (`products_id`) ON DELETE CASCADE
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `products_to_categories` (
    `products_id` int NOT NULL,
    `categories_id` int NOT NULL,
    PRIMARY KEY (`categories_id`, `products_id`),
    KEY `idx_cid` (`categories_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (105, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (106, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (107, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (108, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (109, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (110, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (111, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (112, 8);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (113, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (114, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (115, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (116, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (117, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (118, 490);

INSERT INTO
  `products_to_categories` (`products_id`, `categories_id`)
VALUES
  (119, 490);

CREATE TABLE
  `products_to_products_extra_fields` (
    `products_id` int unsigned NOT NULL,
    `products_extra_fields_id` int unsigned NOT NULL,
    `field_values` json NOT NULL,
    PRIMARY KEY (`products_id`, `products_extra_fields_id`),
    KEY `idx_p2pef_field` (`products_extra_fields_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

CREATE TABLE
  `sessions` (
    `session_key` char(64) NOT NULL,
    `customers_id` int DEFAULT NULL,
    `session_data` json NOT NULL,
    `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`session_key`),
    KEY `idx_sessions_customers_id` (`customers_id`),
    CONSTRAINT `fk_sessions_customers_id` FOREIGN KEY (`customers_id`) REFERENCES `customers` (`customers_id`) ON DELETE SET NULL
  ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO
  `sessions` (
    `session_key`,
    `customers_id`,
    `session_data`,
    `created_at`,
    `last_modified`
  )
VALUES
  (
    '1198a14f-1598-4ee7-9ec3-3a55f8001363',
    NULL,
    CAST(
      '{\"cart\":[],\"prefs\":{\"cu\":1,\"lang\":1,\"sort\":\"asc\",\"theme\":\"clean-slate\",\"locale\":\"en-US\",\"productsPerPage\":25},\"checkout\":\"cart\"}' AS JSON
    ),
    '2026-09-18 13:46:42',
    '2026-09-18 13:46:42'
  );

INSERT INTO
  `sessions` (
    `session_key`,
    `customers_id`,
    `session_data`,
    `created_at`,
    `last_modified`
  )
VALUES
  (
    '363fb902-b9d2-42b5-a725-a66e26b02641',
    NULL,
    CAST(
      '{\"cart\":[],\"prefs\":{\"cu\":1,\"lang\":1,\"sort\":\"asc\",\"theme\":\"clean-slate\",\"locale\":\"en-US\",\"productsPerPage\":25},\"checkout\":\"cart\"}' AS JSON
    ),
    '2026-09-18 13:47:37',
    '2026-09-18 13:47:37'
  );

SET
  FOREIGN_KEY_CHECKS = 1;