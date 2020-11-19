import React from 'react';
import NoteData from '../Data/NoteData';

const noteUSD1:NoteData = {
    title: "SomeSpending",
    expenses: 100,
    currencyCode: "USD"
} 
const noteUSD2:NoteData = {
    title: "Spending",
    expenses: 200,
    currencyCode: "USD"
} 
const noteMDL:NoteData = {
    title: "Spending mdl",
    expenses: 200,
    currencyCode: "MDL"
} 

const noteEUR:NoteData = {
    title: "Spending eur",
    expenses: 150,
    currencyCode: "EUR"
} 

const notesData = [
    noteUSD1, noteUSD2, noteMDL, noteEUR
]

const NotesContext = React.createContext({
    notes: notesData
});