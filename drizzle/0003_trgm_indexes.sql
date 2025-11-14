-- habilita extensão pg_trgm
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- índices TRGM para busca rápida
CREATE INDEX books_title_trgm_idx
  ON books USING GIN (title gin_trgm_ops);

CREATE INDEX books_author_name_trgm_idx
  ON books USING GIN (author_name gin_trgm_ops);

CREATE INDEX books_genre_trgm_idx
  ON books USING GIN (genre gin_trgm_ops);

CREATE INDEX books_publisher_trgm_idx
  ON books USING GIN (publisher gin_trgm_ops);

CREATE INDEX books_isbn_trgm_idx
  ON books USING GIN (isbn gin_trgm_ops);

CREATE INDEX books_tombo_trgm_idx
  ON books USING GIN (tombo gin_trgm_ops);

CREATE INDEX books_edition_trgm_idx
  ON books USING GIN (edition gin_trgm_ops);

CREATE INDEX books_material_type_trgm_idx
  ON books USING GIN (material_type gin_trgm_ops);

CREATE INDEX books_aquisition_method_trgm_idx
  ON books USING GIN (aquisition_method gin_trgm_ops);

CREATE INDEX books_cdd_or_cdu_trgm_idx
  ON books USING GIN (cdd_or_cdu gin_trgm_ops);
