import * as slug from 'slugify';

const slugify = (text: string): string => {
    return slug(text, {lower: true});
}

export default {
    slugify
}