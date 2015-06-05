/** Schema for Users Collection
{
  _id: ,
  username: ,
  records: [ 
    {
      _id: ,
      project: {
        _id: ,
        projectName: 
      },
      startTime: ,
      endTime: ,
      timeLength: ,
      labels:[
        {
          _id: ,
          name: ,
          color: 
        },
        {
          _id: ,
          name: ,
          color: 
        }
      ]
    },
    {
      _id: ,
      projectName: ,
      startTime: ,
      endTime: ,
      timeLength: ,
      labels:[
        {
          _id: ,
          name: ,
          color: 
        }
      ]
    }
  ]
}
*/

/** Schema for Projects Collection
{
  _id: ,
  projectName: ,
  users: [
    {
      user_id: [record_id, record_id, ...] 
    }
  ]
}
*/

/** Schema for Labels Collection
{
  _id: ,
  labelName: ,
  color: ,
  users: [
    {
      user_id: [record_id, record_id, ...] 
    }
  ]
}
*/