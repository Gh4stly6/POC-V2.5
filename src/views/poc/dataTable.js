/* eslint-disable react/jsx-key */
import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import 'bootstrap/dist/css/bootstrap.min.css'

const DataTable = () => {
  const columns = useMemo(() => [
    {
      Header: 'Date',
      accesor: 'date',
    },
    {
      Header: 'Loan ID',
      accesor: 'loanID',
    },
    {
      Header: 'Borrower',
      accesor: 'borrower',
    },
    {
      Header: 'Credit Score',
      accesor: 'credit_score',
    },
    {
      Header: 'Title Run',
      accesor: 'title_run',
    },
    {
      Header: 'Appraisal;',
      accesor: 'appraisal',
    },
    {
      Header: 'Employment Status',
      accesor: 'employment_status',
    },
    {
      Header: 'Final Decision',
      accesor: 'final_Decision',
    },
  ])

  const data = useMemo(() => [
    {
      product: 'Home Equity',
      date: '4/01/2022',
      id: '944ce9de-c296-4937-9e85-f3574d782c43',
      borrower: 'John Doe',
      credit_score: '800',
      title_run: 'Done',
      appraisal: 'In process',
      employment_status: 'In process',
      final_desicion: 'Make',
    },
    {
      product: 'Home Equity',
      date: '3/22/2022',
      id: '944ce9de-c296-4937-9e85-f3574d7825855',
      borrower: 'Alice Smith',
      credit_score: '700',
      title_run: 'Done',
      appraisal: 'Done',
      employment_status: 'Done',
      final_desicion: 'No',
    },
  ])

  const tableInstance = useTable({ columns, data })

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.map((column) => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return row.cells.map((cell, idx) => (
            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
          ))
        })}
      </tbody>
    </table>
  )
}

export default DataTable
