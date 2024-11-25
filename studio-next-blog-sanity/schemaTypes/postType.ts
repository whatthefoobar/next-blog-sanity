import {defineField, defineType} from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              {title: 'Technology', value: 'technology'},
              {title: 'Economy', value: 'economy'},
              {title: 'Health', value: 'health'},
              {title: 'Fashion', value: 'fashion'},
              {title: 'Education', value: 'education'},
              {title: 'Diy', value: 'diy'},
              {title: 'Activism', value: 'activism'},
            ],
          },
        },
      ],
      title: 'Tags',
      description: 'Add tags to categorize your post',
    }),
  ],
})
