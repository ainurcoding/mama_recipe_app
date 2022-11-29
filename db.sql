-- versi jadi di pg admin
CREATE TABLE IF NOT EXISTS public.users
(
    id_user integer NOT NULL DEFAULT nextval('users_id_user_seq'::regclass),
    name character varying(50) COLLATE pg_catalog."default",
    email character varying(50) COLLATE pg_catalog."default",
    password character varying COLLATE pg_catalog."default",
    phone character varying(20) COLLATE pg_catalog."default",
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    recipes_id integer,
    CONSTRAINT users_pkey PRIMARY KEY (id_user)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.recipes
(
    id_recipes integer NOT NULL DEFAULT nextval('recipes_id_recipes_seq'::regclass),
    title character varying(50) COLLATE pg_catalog."default",
    ingredients text COLLATE pg_catalog."default",
    video text COLLATE pg_catalog."default",
    photo text COLLATE pg_catalog."default",
    user_id integer,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone,
    CONSTRAINT recipes_pkey PRIMARY KEY (id_recipes)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.recipes
    OWNER to postgres;

-- versi sebelum jadi di pg admin
CREATE TABLE public.users
(
    id_user serial NOT NULL,
    name character varying(50),
    email character varying(50),
    password character varying,
    phone character varying(20),
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    recipes_id integer,
    PRIMARY KEY (id_user)
);

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

CREATE TABLE public.recipes
(
    id_recipes serial NOT NULL,
    title character varying(50),
    ingredients text,
    video text,
    photo text,
    user_id integer,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone,
    PRIMARY KEY (id_recipes)
);

ALTER TABLE IF EXISTS public.recipes
    OWNER to postgres;

