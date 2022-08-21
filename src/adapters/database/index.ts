import type { Note } from '../../schema/note'
import { fetchNotes } from '../../note-date'
import { Firestore } from '@google-cloud/firestore'

async function getAllNotes(): Promise<Array<Note>> {
  return fetchNotes()
}

export const database = {
  getAllNotes,
  addNote,
}

// Create a new client
const firestore = new Firestore({
  // port: 55811,
  projectId: 'emulator-02', // TODO: add this via env var
});

async function addNote({ title, content }: { title: string, content: string }): Promise<Array<Note>> {
  // Obtain a document reference.
  const collection = firestore.collection('notes')
  
  await collection.add({
    title,
    content,
  })
  
  const snapshots = await collection.get()
  const result = snapshots.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Note[]
  console.log("🚀 ~ file: index.ts ~ line 31 ~ addNote ~ result ", result )
  return result
}
