export const parseBookingId = (bookingId: string): string => {
  if (!bookingId) return '';
  switch (true) {
    case bookingId.includes('train'):
      return 'Station';
    case bookingId.includes('airport'):
      return 'Airport';
    case bookingId.includes('city'):
      return 'City';
    default:
      return bookingId.split('-')[0];
  }
};

export const parseAddress = ({
  city,
  region,
  country,
}: {
  city: string;
  region: string;
  country: string;
}): string => {
  let address = '';
  if (city) address += city;
  if (region) address += `, ${region}`;
  if (country) address += `, ${country}`;
  return address.replace(/(^,)|(,$)/g, '');
};
