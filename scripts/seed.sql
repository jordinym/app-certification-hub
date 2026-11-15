INSERT INTO providers (id, slug, name) VALUES ('microsoft', 'microsoft', 'Microsoft') ON CONFLICT(slug) DO NOTHING;
INSERT INTO providers (id, slug, name) VALUES ('github', 'github', 'GitHub') ON CONFLICT(slug) DO NOTHING;
-- Codes are user-requested study goals, not verified official metadata.
INSERT INTO certifications (id, provider_id, code, title) SELECT 'microsoft-az-900', id, 'AZ-900', 'AZ-900' FROM providers WHERE slug = 'microsoft' ON CONFLICT(provider_id, code) DO NOTHING;
INSERT INTO certifications (id, provider_id, code, title) SELECT 'microsoft-ai-901', id, 'AI-901', 'AI-901' FROM providers WHERE slug = 'microsoft' ON CONFLICT(provider_id, code) DO NOTHING;
INSERT INTO certifications (id, provider_id, code, title) SELECT 'microsoft-ai-200', id, 'AI-200', 'AI-200' FROM providers WHERE slug = 'microsoft' ON CONFLICT(provider_id, code) DO NOTHING;
INSERT INTO certifications (id, provider_id, code, title) SELECT 'microsoft-az-104', id, 'AZ-104', 'AZ-104' FROM providers WHERE slug = 'microsoft' ON CONFLICT(provider_id, code) DO NOTHING;
INSERT INTO certifications (id, provider_id, code, title) SELECT 'microsoft-az-305', id, 'AZ-305', 'AZ-305' FROM providers WHERE slug = 'microsoft' ON CONFLICT(provider_id, code) DO NOTHING;
