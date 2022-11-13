// const AppointmentFormContainerBasic = ({visible, visibleChange, appointmentData, cancelAppointment, appointmentChanges, target, onHide}) => {
//   const [dataChanges, setDataChanges] = useState({})

//   const changeAppointment = ({ field, changes }) =>{
//     setDataChanges({
//       ...appointmentChanges,
//       [field]: changes,
//     })
//   }

//   const commitAppointment = (type) => {
//     const { commitChanges } = this.props;
//     const appointment = {
//       ...this.getAppointmentData(),
//       ...this.getAppointmentChanges(),
//     };
//     if (type === 'deleted') {
//       commitChanges({ [type]: appointment.id });
//     } else if (type === 'changed') {
//       commitChanges({ [type]: { [appointment.id]: appointment } });
//     } else {
//       commitChanges({ [type]: appointment });
//     }
//     this.setState({
//       appointmentChanges: {},
//     });
//   }
//   const { appointmentChanges } = this.state;

//     const displayAppointmentData = {
//       ...appointmentData,
//       ...dataChanges,
//     };

//     const isNewAppointment = appointmentData.id === undefined;
//     const applyChanges = isNewAppointment
//       ? () => this.commitAppointment('added')
//       : () => this.commitAppointment('changed');

//     const textEditorProps = (field) => ({
//       variant: 'outlined',
//       onChange: ({ target: change }) =>
//         this.changeAppointment({
//           field: [field],
//           changes: change.value,
//         }),
//       value: displayAppointmentData[field] || '',
//       label: field[0].toUpperCase() + field.slice(1),
//       className: classes.textField,
//     });

//     const pickerEditorProps = (field) => ({
//       // keyboard: true,
//       value: displayAppointmentData[field],
//       onChange: (date) =>
//         this.changeAppointment({
//           field: [field],
//           changes: date ? date.toDate() : new Date(displayAppointmentData[field]),
//         }),
//       ampm: false,
//       inputFormat: 'DD/MM/YYYY HH:mm',
//       onError: () => null,
//     });
//     const startDatePickerProps = pickerEditorProps('startDate');
//     const endDatePickerProps = pickerEditorProps('endDate');
//     const cancelChanges = () => {
//       this.setState({
//         appointmentChanges: {},
//       });
//       visibleChange();
//       cancelAppointment();
//     };

//     return (
//       <AppointmentForm.Overlay visible={visible} target={target} fullSize onHide={onHide}>
//         <StyledDiv>
//           <div className={classes.header}>
//             <IconButton className={classes.closeButton} onClick={cancelChanges} size="large">
//               <Close color="action" />
//             </IconButton>
//           </div>
//           <div className={classes.content}>
//             <div className={classes.wrapper}>
//               <Create className={classes.icon} color="action" />
//               <TextField {...textEditorProps('title')} />
//             </div>
//             <div className={classes.wrapper}>
//               <CalendarToday className={classes.icon} color="action" />
//               <LocalizationProvider dateAdapter={AdapterMoment}>
//                 <DateTimePicker
//                   label="Start Date"
//                   renderInput={(props) => <TextField className={classes.picker} {...props} />}
//                   {...startDatePickerProps}
//                 />
//                 <DateTimePicker
//                   label="End Date"
//                   renderInput={(props) => <TextField className={classes.picker} {...props} />}
//                   {...endDatePickerProps}
//                 />
//               </LocalizationProvider>
//             </div>
//             <div className={classes.wrapper}>
//               <LocationOn className={classes.icon} color="action" />
//               <TextField {...textEditorProps('location')} />
//             </div>
//             <div className={classes.wrapper}>
//               <Notes className={classes.icon} color="action" />
//               <TextField {...textEditorProps('notess')} multiline rows="6" />
//             </div>
//           </div>
//           <div className={classes.buttonGroup}>
//             {!isNewAppointment && (
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 className={classes.button}
//                 onClick={() => {
//                   visibleChange();
//                   this.commitAppointment('deleted');
//                 }}
//               >
//                 Delete
//               </Button>
//             )}
//             <Button
//               variant="outlined"
//               color="primary"
//               className={classes.button}
//               onClick={() => {
//                 visibleChange();
//                 applyChanges();
//               }}
//             >
//               {isNewAppointment ? 'Create' : 'Save'}
//             </Button>
//           </div>
//         </StyledDiv>
//       </AppointmentForm.Overlay>
//     );
//   }
