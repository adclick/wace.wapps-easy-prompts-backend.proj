-- Active: 1692912950839@@localhost@3336
-- Reset All
truncate wace.technologies restart identity cascade;
truncate wace.providers restart identity cascade;
truncate wace.technologies_providers restart identity cascade;
truncate wace.parameters restart identity cascade;
truncate wace.technologies_providers_parameters restart identity cascade;
truncate wace.categories restart identity cascade;
truncate wace.modifiers restart identity cascade;
truncate wace.users restart identity cascade;
truncate wace.repositories restart identity cascade;
truncate wace.users_repositories restart identity cascade;
truncate wace.languages restart identity cascade;

-- Languages
insert into wace.languages (name, slug) values ('English', 'en');
insert into wace.languages (name, slug) values ('Portuguese', 'pt');

-- Users
insert into wace.users (auth0_id, email, language_id, theme, first_login) values ('auth0|653116ca7e1334d7874ff7f7', 'nuno.saraiva@wacestudio.com', (select id from wace.languages where slug = 'en'), 'dark', true);


-- Repositories
insert into wace.repositories (name, slug, creator_id) values ('My Repository', 'my-repository', (select id from wace.users where email = 'nuno.saraiva@wacestudio.com'));
insert into wace.repositories (name, slug, creator_id) values ('Wace', 'wace', (select id from wace.users where email = 'nuno.saraiva@wacestudio.com'));

-- Technologies
insert into wace.technologies (name_en, name_pt, slug, "default") values('Text Generation', 'Geração de Texto', 'text-generation', true);
insert into wace.technologies (name_en, name_pt, slug, "default") values('Image Generation', 'Gereção de Imagem', 'image-generation', false);
insert into wace.technologies (name_en, name_pt, slug, "default") values('Translation', 'Tradução', 'translation', false);
insert into wace.technologies (name_en, name_pt, slug, "default") values('Keywords Extraction', 'Extração de keywords', 'keywords-extraction', false);

-- Providers
insert into wace.providers (name_en, name_pt, slug, "default") values('Openai', 'Openai', 'openai', true);
insert into wace.providers (name_en, name_pt, slug, "default") values('Google', 'Google', 'google', false);
insert into wace.providers (name_en, name_pt, slug, "default") values('DeepAI', 'DeepAI', 'deepai', false);
insert into wace.providers (name_en, name_pt, slug, "default") values('Microsoft', 'Microsoft', 'microsoft', false);

-- Text Generation
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'text-generation'), (select id from wace.providers where slug = 'openai'), true);
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'text-generation'), (select id from wace.providers where slug = 'google'), false);

-- Image Generation
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'image-generation'), (select id from wace.providers where slug = 'openai'), true);
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'image-generation'), (select id from wace.providers where slug = 'deepai'), false);

-- Translation
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'translation'), (select id from wace.providers where slug = 'openai'), true);
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'translation'), (select id from wace.providers where slug = 'google'), false);
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'translation'), (select id from wace.providers where slug = 'microsoft'), false);

-- Keywords Extraction
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'keywords-extraction'), (select id from wace.providers where slug = 'openai'), true);
insert into wace.technologies_providers (technology_id, provider_id, "default") values((select id from wace.technologies where slug = 'keywords-extraction'), (select id from wace.providers where slug = 'microsoft'), false);

-- Parameters
insert into wace.parameters (name_en, name_pt, slug) values('Number of Images', 'Número de Imagens', 'num-images');
insert into wace.parameters (name_en, name_pt, slug) values('Image Resolution', 'Resolução de Imagem', 'image-resolution');
insert into wace.parameters (name_en, name_pt, slug) values('Source Language', 'Língua de Origem', 'source-language');
insert into wace.parameters (name_en, name_pt, slug) values('Target Language', 'Língua Alvo', 'target-language');

-- Parameters for Image Generation
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'image-generation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'openai'), (select id from wace.parameters where slug = 'num-images'), '{"num-images": "4"}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'image-generation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'deepai'), (select id from wace.parameters where slug = 'num-images'), '{"num-images": "4"}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'image-generation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'openai'), (select id from wace.parameters where slug = 'image-resolution'), '{"image-resolution": ["256x256", "512x512", "1024x1024"]}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'image-generation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'deepai'), (select id from wace.parameters where slug = 'image-resolution'), '{"image-resolution": ["256x256", "512x512", "1024x1024"]}');

-- Parameters for Translation
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'translation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'microsoft'), (select id from wace.parameters where slug = 'source-language'), '{"source-language": ["pt", "en"]}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'translation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'google'), (select id from wace.parameters where slug = 'source-language'), '{"source-language": ["pt", "en"]}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'translation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'microsoft'), (select id from wace.parameters where slug = 'target-language'), '{"target-language": ["pt", "en"]}');
insert into wace.technologies_providers_parameters (technology_provider_id, parameter_id, content) values((select tp.id from wace.technologies_providers tp inner join wace.technologies t on t.id = tp.technology_id and t.slug = 'translation' inner join wace.providers p on p.id = tp.provider_id and p.slug = 'google'), (select id from wace.parameters where slug = 'target-language'), '{"target-language": ["pt", "en"]}');

-- Categories
insert into wace.categories (name, slug) values ('Social Media', 'social-media');
insert into wace.categories (name, slug) values ('SEO', 'seo');
insert into wace.categories (name, slug) values ('Design', 'design');
insert into wace.categories (name, slug) values ('Copywriting', 'copywriting');
insert into wace.categories (name, slug) values ('Other', 'other');

-- Modifiers
insert into wace.modifiers (name, content, description, slug, score, created_at, technology_id, user_id, repository_id, language_id, category_id) values ('Clarification and Detail Expansion', 'Provide rich and detailed information from the given prompt: %PROMPT%', 'Provide rich and detailed information from the given prompt: %PROMPT%', 'clarification-and-detail-expansion', 50, now(), (select id from wace.technologies where slug = 'text-generation'), (select id from wace.users where email = 'nuno.saraiva@wacestudio.com'), (select id from wace.repositories where slug = 'my-repository'), (select language_id from wace.users where email = 'nuno.saraiva@wacestudio.com'), (select id from wace.categories where slug = 'copywriting'));
-- insert into wace.modifiers (name_en, name_pt, content_en, content_pt, description_en, description_pt, slug, technology_id, user_id, repository_id, language_id) values ('Detailed and captivating image', 'Imagem cativante e detalhada', 'Provide a captivating and high-resolution image from the following prompt: %PROMPT%', 'Pode fornecer mais detalhes sobre %PROMPT%? Quanto mais informações específicas você fornecer, melhor poderei ajudar na geração de conteúdo de alta qualidade.', 'Provide a captivating and high-resolution image from the following prompt: %PROMPT%', 'Pedido de informações adicionais para melhorar a qualidade do conteúdo.', 'detailed-and-captivating-image', (select id from wace.technologies where slug = 'image-generation'), (select id from wace.users where email = 'nuno.saraiva@wacestudio.com'), (select id from wace.repositories where creator_id = (select id from wace.users where email = 'nuno.saraiva@wacestudio.com')), (select language_id from wace.users where email = 'nuno.saraiva@wacestudio.com'));


-- Prompts'
INSERT INTO wace.prompts(name, content, description, slug, score, created_at, technology_id, provider_id, user_id, repository_id, language_id, category_id) VALUES ('Generate Social Media Marketing Ideas', 'Prompt to generate innovative and engaging social media marketing concepts for a product launch.', 'Generate creative and effective social media marketing ideas to boost product visibility and engagement.', 'generate-social-media-marketing-ideas', 50, NOW(), (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), (SELECT id FROM wace.providers WHERE slug = 'openai'), (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), (SELECT id FROM wace.repositories WHERE slug = 'wace'), (SELECT id FROM wace.languages WHERE slug= 'en'), (SELECT id FROM wace.categories WHERE slug = 'other'));
INSERT INTO wace.prompts(name, content, description, slug, score, created_at, technology_id, provider_id, user_id, repository_id, language_id, category_id) VALUES ('Write Compelling Social Media Ad Copy', 'Prompt to generate persuasive and click-worthy ad copy for social media advertisements.', 'Generate impactful and persuasive ad copy for social media ads to increase click-through rates and user engagement.', 'write-compelling-social-media-ad-copy', 50, NOW(), (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), (SELECT id FROM wace.providers WHERE slug = 'openai'), (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), (SELECT id FROM wace.repositories WHERE slug = 'wace'), (SELECT id FROM wace.languages WHERE slug= 'en'), (SELECT id FROM wace.categories WHERE slug = 'other'));
INSERT INTO wace.prompts(name, content, description, slug, score, created_at, technology_id, provider_id, user_id, repository_id, language_id, category_id) VALUES ('Create Social Media Content Calendar', 'Prompt to generate a well-planned content calendar for social media platforms.', 'Generate a comprehensive and strategic content calendar for social media platforms to maintain consistent brand communication and engagement.', 'create-social-media-content-calendar', 50, NOW(), (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), (SELECT id FROM wace.providers WHERE slug = 'openai'), (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), (SELECT id FROM wace.repositories WHERE slug = 'wace'), (SELECT id FROM wace.languages WHERE slug= 'en'), (SELECT id FROM wace.categories WHERE slug = 'other'));
INSERT INTO wace.prompts (
    name, 
    content, 
    description, 
    slug, 
    score, 
    created_at, 
    technology_id, 
    provider_id, 
    user_id, 
    repository_id, 
    language_id, 
    category_id
) VALUES (
    'Optimizing Website Content for Search Engines',
    'Explore advanced techniques for enhancing website content to improve search engine visibility and user engagement.',
    'Learn the best practices and strategies for optimizing website content to achieve higher rankings on search engine results pages (SERPs).',
    'seo-website-content-optimization',
    50, 
    NOW(), 
    (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), 
    (SELECT id FROM wace.providers WHERE slug = 'openai'), 
    (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), 
    (SELECT id FROM wace.repositories WHERE slug = 'wace'), 
    (SELECT id FROM wace.languages WHERE slug= 'en'), 
    (SELECT id FROM wace.categories WHERE slug = 'other')
);
INSERT INTO wace.prompts (
    name, 
    content, 
    description, 
    slug, 
    score, 
    created_at, 
    technology_id, 
    provider_id, 
    user_id, 
    repository_id, 
    language_id, 
    category_id
) VALUES (
    'Effective Strategies for Building Quality Backlinks',
    'Discover proven methods and techniques to build high-quality backlinks that contribute to improved SEO performance.',
    'Explore the importance of backlinks in SEO and learn practical strategies to acquire valuable and authoritative links to your website.',
    'seo-backlink-building-strategies',
    50, 
    NOW(), 
    (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), 
    (SELECT id FROM wace.providers WHERE slug = 'openai'), 
    (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), 
    (SELECT id FROM wace.repositories WHERE slug = 'wace'), 
    (SELECT id FROM wace.languages WHERE slug= 'en'), 
    (SELECT id FROM wace.categories WHERE slug = 'other')
);
INSERT INTO wace.prompts (
    name, 
    content, 
    description, 
    slug, 
    score, 
    created_at, 
    technology_id, 
    provider_id, 
    user_id, 
    repository_id, 
    language_id, 
    category_id
) VALUES (
    'Mastering On-Page SEO Techniques',
    'Learn comprehensive on-page SEO strategies to enhance the visibility and relevance of your web pages in search engine results.',
    'Explore the intricacies of on-page SEO, covering topics such as keyword optimization, meta tags, and content structuring.',
    'seo-on-page-optimization',
    50, 
    NOW(), 
    (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), 
    (SELECT id FROM wace.providers WHERE slug = 'openai'), 
    (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), 
    (SELECT id FROM wace.repositories WHERE slug = 'wace'), 
    (SELECT id FROM wace.languages WHERE slug= 'en'), 
    (SELECT id FROM wace.categories WHERE slug = 'other')
);
INSERT INTO wace.prompts (
    name, 
    content, 
    description, 
    slug, 
    score, 
    created_at, 
    technology_id, 
    provider_id, 
    user_id, 
    repository_id, 
    language_id, 
    category_id
) VALUES (
    'Headlines para Indústria Automóvel',
    'Cria títulos cativantes para uma série de artigos relacionados às tendências da indústria automóvel.',
    'Títulos cativantes para indústria automóvel.',
    'headlines-para-industria-automovel',
    50, 
    NOW(), 
    (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), 
    (SELECT id FROM wace.providers WHERE slug = 'openai'), 
    (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), 
    (SELECT id FROM wace.repositories WHERE slug = 'wace'), 
    (SELECT id FROM wace.languages WHERE slug= 'pt'), 
    (SELECT id FROM wace.categories WHERE slug = 'other')
);
INSERT INTO wace.prompts (
    name, 
    content, 
    description, 
    slug, 
    score, 
    created_at, 
    technology_id, 
    provider_id, 
    user_id, 
    repository_id, 
    language_id, 
    category_id
) VALUES (
    'Keywords de Natal',
    'Cria uma lista abrangente de keywords relevantes e relacionadas com o Natal. Garante que as keywords abranjam um amplo espectro de aspectos e complexidades associadas ao tópico. O objetivo é capturar a essência do Natal incluindo termos amplamente reconhecidos, bem como aqueles que podem ser mais específicos ou especializados. Fornece uma variedade diversificada de keywords para atender aos diferentes níveis de familiaridade com o tema.',
    'Lista de keywords relevantes sobre o Natal',
    'headlines-para-industria-automovel',
    50, 
    NOW(), 
    (SELECT id FROM wace.technologies WHERE slug = 'text-generation'), 
    (SELECT id FROM wace.providers WHERE slug = 'openai'), 
    (SELECT id FROM wace.users WHERE email = 'nuno.saraiva@wacestudio.com'), 
    (SELECT id FROM wace.repositories WHERE slug = 'wace'), 
    (SELECT id FROM wace.languages WHERE slug= 'pt'), 
    (SELECT id FROM wace.categories WHERE slug = 'other')
);
