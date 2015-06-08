/** Schema for Records Collection
{
  _id: ,
  startTime: ,
  endTime: ,
  project: {
    _id: ,
    projectName: 
  },
  labels: [
    {
      label_id: ,
      label_name: ,
      label_color: 
    }
  ]
  records: [
    record_id, record_id, record_id, record_id, 
  ]
}
*/



/** Schema for Users Collection
{
  _id: ,
  username: ,
  records: [ 
    record_id, record_id, record_id, record_id, 
  ]
}
*/



/** Schema for Projects Collection
{
  _id: ,
  projectName: ,
  records: [
    record_id, record_id, record_id, record_id, 
  ]
}
*/

/** Schema for Labels Collection
{
  _id: ,
  labelName: ,
  color: ,
  records: [
    record_id, record_id, record_id, record_id, 
  ]
}
*/