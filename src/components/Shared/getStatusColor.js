const getStatusColor = (status) => {
  switch (status) {
    case 'Accepted':
      return 'text-green-600';
    case 'Pending':
      return 'text-purple-600';
    case 'Booked':
      return 'text-orange-600';
    case 'Rejected':
      return 'text-red-700';
    default:
      return 'text-gray-600';
  }
};

export default getStatusColor;
