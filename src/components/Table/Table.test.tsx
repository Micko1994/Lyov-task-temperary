import { screen } from '@testing-library/react';

import { render } from 'utils/unit-test';

import { MuiTable } from './index';

const mockColumn = [
  {
    id: 1,
    label: 'id',
    minWidth: 100,
  },
  {
    id: 2,
    label: 'name',
    minWidth: 100,
  },
  {
    id: 3,
    label: 'description',
    minWidth: 100,
  },
  {
    id: 4,
    label: 'date',
    minWidth: 100,
  }
];

const mockData = [
  {
    id: 1,
    name: 'first name',
    description: 'first description',
    date: '02.09.2022'
  },
  {
    id: 2,
    name: 'two name',
    description: 'two description',
    date: '02.09.2022'
  },
  {
    id: 3,
    name: 'tree name',
    description: 'tree description',
    date: '02.09.2022'
  },
  {
    id: 4,
    name: 'four name',
    description: 'four description',
    date: '02.09.2022'
  },

];


describe('Table', () => {
  it('renders Table correctly', async () => {
    render(<MuiTable columns={mockColumn} data={mockData} />);

    expect(await screen.findByTestId('Mui-table-container')).toBeInTheDocument();
  });

  it('renders CircularProgress during loading data', async () => {
    render(<MuiTable columns={mockColumn} data={mockData} isBusy={true} />);

    expect(await screen.findByTestId('circular-progress-container')).toBeInTheDocument();
  });

  it('name of first TableRow should be as expected', async function () {
    render(<MuiTable columns={mockColumn} data={mockData} />);
    expect(await screen.getByTestId('TableRow-1').children.item(1))
      .toHaveTextContent(mockData[ 0 ].name);
  });

  it('description of second TableRow should be as expected', async function () {
    render(<MuiTable columns={mockColumn} data={mockData} />);
    expect(await screen.getByTestId('TableRow-1').children.item(2))
      .toHaveTextContent(mockData[ 0 ].description);
  });

});
