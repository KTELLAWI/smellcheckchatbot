{
	"data": [
		{
			"collection": "Characteristics",
			"meta": {
				"collection": "Characteristics",
				"icon": null,
				"note": null,
				"display_template": null,
				"hidden": false,
				"singleton": false,
				"translations": null,
				"archive_field": null,
				"archive_app_filter": true,
				"archive_value": null,
				"unarchive_value": null,
				"sort_field": null,
				"accountability": "all",
				"color": null,
				"item_duplication_fields": null,
				"sort": null,
				"group": null,
				"collapse": "open",
				"preview_url": null,
				"versioning": false
			},
			"schema": {
				"name": "Characteristics",
				"sql": "CREATE TABLE `Characteristics` (`id` char(36) not null, `characteristic_name` varchar(255) null, `choices` json null, primary key (`id`))"
			}
		},
		{
			"collection": "Characteristics_ar",
			"meta": {
				"collection": "Characteristics_ar",
				"icon": null,
				"note": null,
				"display_template": null,
				"hidden": false,
				"singleton": false,
				"translations": null,
				"archive_field": null,
				"archive_app_filter": true,
				"archive_value": null,
				"unarchive_value": null,
				"sort_field": null,
				"accountability": "all",
				"color": null,
				"item_duplication_fields": null,
				"sort": null,
				"group": null,
				"collapse": "open",
				"preview_url": null,
				"versioning": false
			},
			"schema": {
				"name": "Characteristics_ar",
				"sql": "CREATE TABLE `Characteristics_ar` (`id` integer not null primary key autoincrement, `characteristic_name` varchar(255) null, `choices` json null)"
			}
		},
		{
			"collection": "logs",
			"meta": {
				"collection": "logs",
				"icon": null,
				"note": null,
				"display_template": null,
				"hidden": false,
				"singleton": false,
				"translations": null,
				"archive_field": null,
				"archive_app_filter": true,
				"archive_value": null,
				"unarchive_value": null,
				"sort_field": null,
				"accountability": "all",
				"color": null,
				"item_duplication_fields": null,
				"sort": null,
				"group": null,
				"collapse": "open",
				"preview_url": null,
				"versioning": false
			},
			"schema": {
				"name": "logs",
				"sql": "CREATE TABLE \"logs\" (`id` char(36) NOT NULL, `user` char(36) NULL, `timestamp` datetime null, `recipient` varchar(255) null, `assesment` text null, PRIMARY KEY (`id`), CONSTRAINT `logs_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE SET NULL)"
			}
		},
		{
			"collection": "users",
			"meta": {
				"collection": "users",
				"icon": null,
				"note": null,
				"display_template": null,
				"hidden": false,
				"singleton": false,
				"translations": null,
				"archive_field": null,
				"archive_app_filter": true,
				"archive_value": null,
				"unarchive_value": null,
				"sort_field": null,
				"accountability": "all",
				"color": null,
				"item_duplication_fields": null,
				"sort": null,
				"group": null,
				"collapse": "open",
				"preview_url": null,
				"versioning": false
			},
			"schema": {
				"name": "users",
				"sql": "CREATE TABLE `users` (`id` char(36) not null, `phone_number` varchar(255) null, `last_logged_in` datetime null, primary key (`id`))"
			}
		},
		{
			"collection": "directus_access",
			"meta": {
				"collection": "directus_access",
				"hidden": false,
				"singleton": false,
				"icon": "admin_panel_settings",
				"note": "$t:directus_collection.directus_access",
				"translations": null,
				"display_template": "{{ policy.name }}",
				"accountability": "all",
				"sort_field": "sort",
				"system": true
			},
			"schema": {
				"name": "directus_access",
				"sql": "CREATE TABLE `directus_access` (`id` char(36), `role` char(36) null, `user` char(36) null, `policy` char(36) not null, `sort` integer, foreign key(`role`) references `directus_roles`(`id`) on delete CASCADE, foreign key(`user`) references `directus_users`(`id`) on delete CASCADE, foreign key(`policy`) references `directus_policies`(`id`) on delete CASCADE, primary key (`id`))"
			}
		},
		{
			"collection": "directus_activity",
			"meta": {
				"collection": "directus_activity",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_activity",
				"translations": null,
				"display_template": null,
				"accountability": null,
				"system": true
			},
			"schema": {
				"name": "directus_activity",
				"sql": "CREATE TABLE \"directus_activity\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `action` varchar(45) NOT NULL, `user` char(36), `timestamp` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `ip` varchar(50), `user_agent` text, `collection` varchar(64) NOT NULL, `item` varchar(255) NOT NULL, `comment` text, `origin` varchar(255) NULL)"
			}
		},
		{
			"collection": "directus_collections",
			"meta": {
				"collection": "directus_collections",
				"hidden": false,
				"singleton": false,
				"icon": "database",
				"note": "$t:directus_collection.directus_collections",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_collections",
				"sql": "CREATE TABLE \"directus_collections\" (`collection` varchar(64) NOT NULL, `icon` varchar(64), `note` text, `display_template` varchar(255), `hidden` boolean NOT NULL DEFAULT '0', `singleton` boolean NOT NULL DEFAULT '0', `translations` json, `archive_field` varchar(64), `archive_app_filter` boolean NOT NULL DEFAULT '1', `archive_value` varchar(255), `unarchive_value` varchar(255), `sort_field` varchar(64), `accountability` varchar(255) DEFAULT 'all', `color` varchar(255) NULL, `item_duplication_fields` json NULL, `sort` integer, `group` varchar(64), `collapse` varchar(255) NOT NULL DEFAULT 'open', `preview_url` varchar(255) NULL, `versioning` boolean NOT NULL DEFAULT '0', PRIMARY KEY (`collection`), FOREIGN KEY (`group`) REFERENCES `directus_collections` (`collection`))"
			}
		},
		{
			"collection": "directus_comments",
			"meta": {
				"collection": "directus_comments",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_comments",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_comments",
				"sql": "CREATE TABLE `directus_comments` (`id` char(36) not null, `collection` varchar(64) not null, `item` varchar(255) not null, `comment` text not null, `date_created` datetime default CURRENT_TIMESTAMP, `date_updated` datetime default CURRENT_TIMESTAMP, `user_created` char(36), `user_updated` char(36), foreign key(`collection`) references `directus_collections`(`collection`) on delete CASCADE, foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, foreign key(`user_updated`) references `directus_users`(`id`), primary key (`id`))"
			}
		},
		{
			"collection": "directus_fields",
			"meta": {
				"collection": "directus_fields",
				"hidden": false,
				"singleton": false,
				"icon": "input",
				"note": "$t:directus_collection.directus_fields",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_fields",
				"sql": "CREATE TABLE \"directus_fields\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `collection` varchar(64) NOT NULL, `field` varchar(64) NOT NULL, `special` varchar(64), `interface` varchar(64), `options` json, `display` varchar(64), `display_options` json, `readonly` boolean NOT NULL DEFAULT '0', `hidden` boolean NOT NULL DEFAULT '0', `sort` integer, `width` varchar(30) DEFAULT 'full', `translations` json, `note` text, `conditions` json, `required` boolean DEFAULT '0', `group` varchar(64), `validation` json, `validation_message` text)"
			}
		},
		{
			"collection": "directus_files",
			"meta": {
				"collection": "directus_files",
				"hidden": false,
				"singleton": false,
				"icon": "folder",
				"note": "$t:directus_collection.directus_files",
				"translations": null,
				"display_template": "{{ $thumbnail }} {{ title }}",
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_files",
				"sql": "CREATE TABLE \"directus_files\" (`id` char(36) NOT NULL, `storage` varchar(255) NOT NULL, `filename_disk` varchar(255), `filename_download` varchar(255) NOT NULL, `title` varchar(255), `type` varchar(255), `folder` char(36), `uploaded_by` char(36), \"created_on\" datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `modified_by` char(36), `modified_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `charset` varchar(50), `filesize` bigint DEFAULT null, `width` integer, `height` integer, `duration` integer, `embed` varchar(200), `description` text, `location` text, `tags` text, `metadata` json, `focal_point_x` integer null, `focal_point_y` integer null, `tus_id` varchar(64) null, `tus_data` json null, `uploaded_on` datetime, PRIMARY KEY (`id`), FOREIGN KEY (`uploaded_by`) REFERENCES `directus_users` (`id`), FOREIGN KEY (`modified_by`) REFERENCES `directus_users` (`id`), FOREIGN KEY (`folder`) REFERENCES `directus_folders` (`id`) ON DELETE SET NULL)"
			}
		},
		{
			"collection": "directus_folders",
			"meta": {
				"collection": "directus_folders",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_folders",
				"translations": null,
				"display_template": "{{ name }}",
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_folders",
				"sql": "CREATE TABLE \"directus_folders\" (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `parent` char(36), PRIMARY KEY (`id`), FOREIGN KEY (`parent`) REFERENCES `directus_folders` (`id`))"
			}
		},
		{
			"collection": "directus_migrations",
			"meta": {
				"collection": "directus_migrations",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_migrations",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_migrations",
				"sql": "CREATE TABLE `directus_migrations` (`version` varchar(255) not null, `name` varchar(255) not null, `timestamp` datetime default CURRENT_TIMESTAMP, primary key (`version`))"
			}
		},
		{
			"collection": "directus_permissions",
			"meta": {
				"collection": "directus_permissions",
				"hidden": false,
				"singleton": false,
				"icon": "admin_panel_settings",
				"note": "$t:directus_collection.directus_permissions",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_permissions",
				"sql": "CREATE TABLE \"directus_permissions\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `collection` varchar(64) NOT NULL, `action` varchar(10) NOT NULL, `permissions` json, `validation` json, `presets` json, `fields` text, `policy` char(36) NOT NULL, FOREIGN KEY (`policy`) REFERENCES `directus_policies` (`id`) ON DELETE CASCADE)"
			}
		},
		{
			"collection": "directus_policies",
			"meta": {
				"collection": "directus_policies",
				"hidden": false,
				"singleton": false,
				"icon": "admin_panel_settings",
				"note": "$t:directus_collection.directus_policies",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_policies",
				"sql": "CREATE TABLE `directus_policies` (`id` char(36), `name` varchar(100) not null, `icon` varchar(64) not null default 'badge', `description` text, `ip_access` text, `enforce_tfa` boolean not null default '0', `admin_access` boolean not null default '0', `app_access` boolean not null default '0', primary key (`id`))"
			}
		},
		{
			"collection": "directus_presets",
			"meta": {
				"collection": "directus_presets",
				"hidden": false,
				"singleton": false,
				"icon": "bookmark",
				"note": "$t:directus_collection.directus_presets",
				"translations": null,
				"display_template": null,
				"accountability": null,
				"system": true
			},
			"schema": {
				"name": "directus_presets",
				"sql": "CREATE TABLE \"directus_presets\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `bookmark` varchar(255), `user` char(36), `role` char(36), `collection` varchar(64), `search` varchar(100), `layout` varchar(100) DEFAULT 'tabular', `layout_query` json, `layout_options` json, `refresh_interval` integer, `filter` json, `icon` varchar(64) DEFAULT 'bookmark', `color` varchar(255) NULL, FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE CASCADE, FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE CASCADE)"
			}
		},
		{
			"collection": "directus_relations",
			"meta": {
				"collection": "directus_relations",
				"hidden": false,
				"singleton": false,
				"icon": "merge_type",
				"note": "$t:directus_collection.directus_relations",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_relations",
				"sql": "CREATE TABLE \"directus_relations\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `many_collection` varchar(64) NOT NULL, `many_field` varchar(64) NOT NULL, `one_collection` varchar(64), `one_field` varchar(64), `one_collection_field` varchar(64), `one_allowed_collections` text, `junction_field` varchar(64), `sort_field` varchar(64), `one_deselect_action` varchar(255) NOT NULL DEFAULT 'nullify')"
			}
		},
		{
			"collection": "directus_revisions",
			"meta": {
				"collection": "directus_revisions",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_revisions",
				"translations": null,
				"display_template": null,
				"accountability": null,
				"system": true
			},
			"schema": {
				"name": "directus_revisions",
				"sql": "CREATE TABLE \"directus_revisions\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `activity` integer NOT NULL, `collection` varchar(64) NOT NULL, `item` varchar(255) NOT NULL, `data` json, `delta` json, `parent` integer, `version` char(36), FOREIGN KEY (`parent`) REFERENCES `directus_revisions` (`id`), FOREIGN KEY (`activity`) REFERENCES `directus_activity` (`id`) ON DELETE CASCADE, FOREIGN KEY (`version`) REFERENCES `directus_versions` (`id`) ON DELETE CASCADE)"
			}
		},
		{
			"collection": "directus_roles",
			"meta": {
				"collection": "directus_roles",
				"hidden": false,
				"singleton": false,
				"icon": "supervised_user_circle",
				"note": "$t:directus_collection.directus_roles",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_roles",
				"sql": "CREATE TABLE \"directus_roles\" (`id` char(36) NOT NULL, `name` varchar(100) NOT NULL, `icon` varchar(64) NOT NULL DEFAULT 'supervised_user_circle', `description` text, `parent` char(36), PRIMARY KEY (`id`), FOREIGN KEY (`parent`) REFERENCES `directus_roles` (`id`))"
			}
		},
		{
			"collection": "directus_sessions",
			"meta": {
				"collection": "directus_sessions",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_sessions",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_sessions",
				"sql": "CREATE TABLE \"directus_sessions\" (`token` varchar(64) NOT NULL, `user` char(36), `expires` datetime NOT NULL, `ip` varchar(255), `user_agent` text, `share` char(36), `origin` varchar(255) NULL, `next_token` varchar(64) null, PRIMARY KEY (`token`), FOREIGN KEY (`user`) REFERENCES `directus_users` (`id`) ON DELETE CASCADE, FOREIGN KEY (`share`) REFERENCES `directus_shares` (`id`) ON DELETE CASCADE)"
			}
		},
		{
			"collection": "directus_settings",
			"meta": {
				"collection": "directus_settings",
				"hidden": false,
				"singleton": true,
				"icon": null,
				"note": "$t:directus_collection.directus_settings",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_settings",
				"sql": "CREATE TABLE \"directus_settings\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `project_name` varchar(100) NOT NULL DEFAULT 'Directus', `project_url` varchar(255), `project_color` varchar(255) NOT NULL DEFAULT '#6644FF', `project_logo` char(36), `public_foreground` char(36), `public_background` char(36), `public_note` text, `auth_login_attempts` integer DEFAULT '25', `auth_password_policy` varchar(100), `storage_asset_transform` varchar(7) DEFAULT 'all', `storage_asset_presets` json, `custom_css` text, `storage_default_folder` char(36), `basemaps` json, `mapbox_key` varchar(255), `module_bar` json, `project_descriptor` varchar(100) NULL, `default_language` varchar(255) NOT NULL DEFAULT 'en-US', `custom_aspect_ratios` json, `public_favicon` char(36), `default_appearance` varchar(255) NOT NULL DEFAULT 'auto', `default_theme_light` varchar(255), `theme_light_overrides` json, `default_theme_dark` varchar(255), `theme_dark_overrides` json, `report_error_url` varchar(255) NULL, `report_bug_url` varchar(255) NULL, `report_feature_url` varchar(255) NULL, `public_registration` boolean NOT NULL DEFAULT '0', `public_registration_verify_email` boolean NOT NULL DEFAULT '1', `public_registration_role` char(36) NULL, `public_registration_email_filter` json NULL, FOREIGN KEY (`project_logo`) REFERENCES `directus_files` (`id`), FOREIGN KEY (`public_foreground`) REFERENCES `directus_files` (`id`), FOREIGN KEY (`public_background`) REFERENCES `directus_files` (`id`), CONSTRAINT `directus_settings_storage_default_folder_foreign` FOREIGN KEY (`storage_default_folder`) REFERENCES `directus_folders` (`id`) ON DELETE SET NULL, FOREIGN KEY (`public_favicon`) REFERENCES `directus_files` (`id`), FOREIGN KEY (`public_registration_role`) REFERENCES `directus_roles` (`id`) ON DELETE SET NULL)"
			}
		},
		{
			"collection": "directus_users",
			"meta": {
				"collection": "directus_users",
				"hidden": false,
				"singleton": false,
				"icon": "people_alt",
				"note": "$t:directus_collection.directus_users",
				"translations": null,
				"display_template": "{{ first_name }} {{ last_name }}",
				"accountability": "all",
				"archive_field": "status",
				"archive_value": "archived",
				"unarchive_value": "draft",
				"system": true
			},
			"schema": {
				"name": "directus_users",
				"sql": "CREATE TABLE \"directus_users\" (`id` char(36) NOT NULL, `first_name` varchar(50), `last_name` varchar(50), `email` varchar(128), `password` varchar(255), `location` varchar(255), `title` varchar(50), `description` text, `tags` json, `avatar` char(36), `language` varchar(255) DEFAULT null, `tfa_secret` varchar(255), `status` varchar(16) NOT NULL DEFAULT 'active', `role` char(36), `token` varchar(255), `last_access` datetime, `last_page` varchar(255), `provider` varchar(128) NOT NULL DEFAULT 'default', `external_identifier` varchar(255), `auth_data` json, `email_notifications` boolean DEFAULT '1', `appearance` varchar(255), `theme_dark` varchar(255), `theme_light` varchar(255), `theme_light_overrides` json, `theme_dark_overrides` json, PRIMARY KEY (`id`), FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE SET NULL)"
			}
		},
		{
			"collection": "directus_webhooks",
			"meta": {
				"collection": "directus_webhooks",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_webhooks",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_webhooks",
				"sql": "CREATE TABLE \"directus_webhooks\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `name` varchar(255) NOT NULL, `method` varchar(10) NOT NULL DEFAULT 'POST', `url` varchar(255) NOT NULL, `status` varchar(10) NOT NULL DEFAULT 'active', `data` boolean NOT NULL DEFAULT '1', `actions` varchar(100) NOT NULL, `collections` varchar(255) NOT NULL, `headers` json, `was_active_before_deprecation` boolean NOT NULL DEFAULT '0', `migrated_flow` char(36) NULL, FOREIGN KEY (`migrated_flow`) REFERENCES `directus_flows` (`id`) ON DELETE SET NULL)"
			}
		},
		{
			"collection": "directus_dashboards",
			"meta": {
				"collection": "directus_dashboards",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_dashboards",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_dashboards",
				"sql": "CREATE TABLE \"directus_dashboards\" (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `icon` varchar(64) NOT NULL DEFAULT 'dashboard', `note` text, `date_created` datetime DEFAULT CURRENT_TIMESTAMP, `user_created` char(36), `color` varchar(255) NULL, FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL, PRIMARY KEY (`id`))"
			}
		},
		{
			"collection": "directus_panels",
			"meta": {
				"collection": "directus_panels",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_panels",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_panels",
				"sql": "CREATE TABLE \"directus_panels\" (`id` char(36) NOT NULL, `dashboard` char(36) NOT NULL, `name` varchar(255), `icon` varchar(64) DEFAULT null, `color` varchar(10), `show_header` boolean NOT NULL DEFAULT '0', `note` text, `type` varchar(255) NOT NULL, `position_x` integer NOT NULL, `position_y` integer NOT NULL, `width` integer NOT NULL, `height` integer NOT NULL, `options` json, `date_created` datetime DEFAULT CURRENT_TIMESTAMP, `user_created` char(36), FOREIGN KEY (`dashboard`) REFERENCES `directus_dashboards` (`id`) ON DELETE CASCADE, FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL, PRIMARY KEY (`id`))"
			}
		},
		{
			"collection": "directus_notifications",
			"meta": {
				"collection": "directus_notifications",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_notifications",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_notifications",
				"sql": "CREATE TABLE \"directus_notifications\" (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `timestamp` datetime DEFAULT CURRENT_TIMESTAMP, `status` varchar(255) DEFAULT 'inbox', `recipient` char(36) NOT NULL, `sender` char(36), `subject` varchar(255) NOT NULL, `message` text, `collection` varchar(64), `item` varchar(255), FOREIGN KEY (`recipient`) REFERENCES `directus_users` (`id`) ON DELETE CASCADE, FOREIGN KEY (`sender`) REFERENCES `directus_users` (`id`))"
			}
		},
		{
			"collection": "directus_shares",
			"meta": {
				"collection": "directus_shares",
				"hidden": false,
				"singleton": false,
				"icon": "share",
				"note": "$t:directus_collection.directus_shares",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_shares",
				"sql": "CREATE TABLE \"directus_shares\" (`id` char(36) NOT NULL, `name` varchar(255), `collection` varchar(64) NOT NULL, `item` varchar(255) NOT NULL, `role` char(36), `password` varchar(255), `user_created` char(36), `date_created` datetime DEFAULT CURRENT_TIMESTAMP, `date_start` datetime NULL DEFAULT null, `date_end` datetime NULL DEFAULT null, `times_used` integer DEFAULT '0', `max_uses` integer, FOREIGN KEY (`collection`) REFERENCES `directus_collections` (`collection`) ON DELETE CASCADE, FOREIGN KEY (`role`) REFERENCES `directus_roles` (`id`) ON DELETE CASCADE, FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL, PRIMARY KEY (`id`))"
			}
		},
		{
			"collection": "directus_flows",
			"meta": {
				"collection": "directus_flows",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_flows",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_flows",
				"sql": "CREATE TABLE \"directus_flows\" (`id` char(36) NOT NULL, `name` varchar(255) NOT NULL, `icon` varchar(64), `color` varchar(255) NULL, `description` text, `status` varchar(255) NOT NULL DEFAULT 'active', `trigger` varchar(255), `accountability` varchar(255) DEFAULT 'all', `options` json, `operation` char(36), `date_created` datetime DEFAULT CURRENT_TIMESTAMP, `user_created` char(36), FOREIGN KEY (`user_created`) REFERENCES `directus_users` (`id`) ON DELETE SET NULL, PRIMARY KEY (`id`))"
			}
		},
		{
			"collection": "directus_operations",
			"meta": {
				"collection": "directus_operations",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_operations",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_operations",
				"sql": "CREATE TABLE `directus_operations` (`id` char(36) not null, `name` varchar(255), `key` varchar(255) not null, `type` varchar(255) not null, `position_x` integer not null, `position_y` integer not null, `options` json, `resolve` char(36), `reject` char(36), `flow` char(36) not null, `date_created` datetime default CURRENT_TIMESTAMP, `user_created` char(36), foreign key(`resolve`) references `directus_operations`(`id`), foreign key(`reject`) references `directus_operations`(`id`), foreign key(`flow`) references `directus_flows`(`id`) on delete CASCADE, foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, primary key (`id`))"
			}
		},
		{
			"collection": "directus_translations",
			"meta": {
				"collection": "directus_translations",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_translations",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_translations",
				"sql": "CREATE TABLE `directus_translations` (`id` char(36) not null, `language` varchar(255) not null, `key` varchar(255) not null, `value` text not null, primary key (`id`))"
			}
		},
		{
			"collection": "directus_versions",
			"meta": {
				"collection": "directus_versions",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_versions",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_versions",
				"sql": "CREATE TABLE `directus_versions` (`id` char(36) not null, `key` varchar(64) not null, `name` varchar(255), `collection` varchar(64) not null, `item` varchar(255) not null, `hash` varchar(255), `date_created` datetime default CURRENT_TIMESTAMP, `date_updated` datetime default CURRENT_TIMESTAMP, `user_created` char(36), `user_updated` char(36), `delta` json, foreign key(`collection`) references `directus_collections`(`collection`) on delete CASCADE, foreign key(`user_created`) references `directus_users`(`id`) on delete SET NULL, foreign key(`user_updated`) references `directus_users`(`id`), primary key (`id`))"
			}
		},
		{
			"collection": "directus_extensions",
			"meta": {
				"collection": "directus_extensions",
				"hidden": false,
				"singleton": false,
				"icon": null,
				"note": "$t:directus_collection.directus_extensions",
				"translations": null,
				"display_template": null,
				"accountability": "all",
				"system": true
			},
			"schema": {
				"name": "directus_extensions",
				"sql": "CREATE TABLE \"directus_extensions\" (`enabled` boolean NOT NULL DEFAULT '1', `id` char(36) NOT NULL, `folder` varchar(255) NOT NULL, `source` varchar(255) NOT NULL, `bundle` char(36), PRIMARY KEY (`id`))"
			}
