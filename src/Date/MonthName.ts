const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const GetMonthName = (month: number) => {

    return monthNames[month];
}

export default GetMonthName;