import { builder } from '../builder';

export type Note = {
  id: string;
  title: string;
  content: string;
}

const NoteRef = builder.objectRef<Note>('Note')

NoteRef.implement({
  fields: t => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    content: t.exposeString('content'),
  })
})

export const queryRef = builder.queryType({
  fields: t => ({
    notes: t.field({
      type: [NoteRef],
      resolve: async (parent, args, context) => {
        // const notes = await context.database.addNote({ title: '01', content: '01' })
        const notes = [{ id: '01', title: '01', content: '01' }]
        return notes
      }      
    })
  })
})