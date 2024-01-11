import slugify from 'slugify';

const toSlug = (text: string): string => slugify(text, {lower: true});

export default {
    toSlug
}