
CREATE TABLE public.professionals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  profession TEXT NOT NULL,
  city TEXT NOT NULL,
  rating NUMERIC(2,1) NOT NULL DEFAULT 0,
  verified BOOLEAN NOT NULL DEFAULT false,
  bio TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.professionals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Professionals are publicly readable"
ON public.professionals
FOR SELECT
USING (true);
