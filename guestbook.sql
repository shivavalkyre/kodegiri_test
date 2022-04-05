/*
 Navicat Premium Data Transfer

 Source Server         : The Artanata
 Source Server Type    : PostgreSQL
 Source Server Version : 130002
 Source Host           : localhost:5432
 Source Catalog        : guestbook
 Source Schema         : public

 Target Server Type    : PostgreSQL
 Target Server Version : 130002
 File Encoding         : 65001

 Date: 05/04/2022 16:45:23
*/


-- ----------------------------
-- Sequence structure for guestbook_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."guestbook_id_seq";
CREATE SEQUENCE "public"."guestbook_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Sequence structure for tbl_user_id_seq
-- ----------------------------
DROP SEQUENCE IF EXISTS "public"."tbl_user_id_seq";
CREATE SEQUENCE "public"."tbl_user_id_seq" 
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
CACHE 1;

-- ----------------------------
-- Table structure for tbl_guestbook
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_guestbook";
CREATE TABLE "public"."tbl_guestbook" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "name" varchar(255) COLLATE "pg_catalog"."default",
  "address" varchar(255) COLLATE "pg_catalog"."default",
  "phone" varchar(255) COLLATE "pg_catalog"."default",
  "note" varchar(255) COLLATE "pg_catalog"."default",
  "created_at" timestamp(0) DEFAULT CURRENT_TIMESTAMP,
  "update_at" timestamp(0),
  "delete_at" timestamp(0),
  "is_delete" bool DEFAULT false
)
;

-- ----------------------------
-- Records of tbl_guestbook
-- ----------------------------
INSERT INTO "public"."tbl_guestbook" OVERRIDING SYSTEM VALUE VALUES (4, 'guest1', 'address_guest1', '088889675890', 'Testing Guest1', '2022-04-05 15:01:40', NULL, NULL, 'f');
INSERT INTO "public"."tbl_guestbook" OVERRIDING SYSTEM VALUE VALUES (5, 'guest2', 'address_guest2', '564756869', 'Testing Guest2', '2022-04-05 15:02:13', NULL, NULL, 'f');
INSERT INTO "public"."tbl_guestbook" OVERRIDING SYSTEM VALUE VALUES (6, 'guest3', 'address_guest3', '76699679', 'Testing Guest3', '2022-04-05 15:02:24', NULL, NULL, 'f');
INSERT INTO "public"."tbl_guestbook" OVERRIDING SYSTEM VALUE VALUES (7, 'guest4', 'address guest4', '445564789', '131242526', '2022-04-05 16:18:30', NULL, NULL, 'f');
INSERT INTO "public"."tbl_guestbook" OVERRIDING SYSTEM VALUE VALUES (8, 'Guest8', 'address Guest 8', '97067968468', 'Guest 8 Note', '2022-04-05 16:18:51', '2022-04-05 16:34:27', NULL, 't');

-- ----------------------------
-- Table structure for tbl_user
-- ----------------------------
DROP TABLE IF EXISTS "public"."tbl_user";
CREATE TABLE "public"."tbl_user" (
  "id" int4 NOT NULL GENERATED ALWAYS AS IDENTITY (
INCREMENT 1
MINVALUE  1
MAXVALUE 2147483647
START 1
),
  "username" varchar(255) COLLATE "pg_catalog"."default",
  "password" varchar(255) COLLATE "pg_catalog"."default",
  "is_delete" bool DEFAULT false
)
;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO "public"."tbl_user" OVERRIDING SYSTEM VALUE VALUES (1, 'admin', '$2b$10$VQlHvWS5D6uZ.YXPFgq4zOhdEoBu2i2NKhBc8yKV00zsxxIYz9Fqa', 'f');

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."guestbook_id_seq"
OWNED BY "public"."tbl_guestbook"."id";
SELECT setval('"public"."guestbook_id_seq"', 9, true);

-- ----------------------------
-- Alter sequences owned by
-- ----------------------------
ALTER SEQUENCE "public"."tbl_user_id_seq"
OWNED BY "public"."tbl_user"."id";
SELECT setval('"public"."tbl_user_id_seq"', 2, true);

-- ----------------------------
-- Primary Key structure for table tbl_guestbook
-- ----------------------------
ALTER TABLE "public"."tbl_guestbook" ADD CONSTRAINT "guest_pkey" PRIMARY KEY ("id");

-- ----------------------------
-- Primary Key structure for table tbl_user
-- ----------------------------
ALTER TABLE "public"."tbl_user" ADD CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id");
