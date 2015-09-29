# Question API


#### 1. Create a new question --> POST /questions
Parameter (JSON format)

| Field  | Type  | Description  |
|---|---|---|
| subject  | String  | Main subject of the question  |
| askedBy | String | Student's id |
| hintType (Optional)| Number | 1 (Hint Only) or 2 (Full solution), default value is 1 |
| messageDTO | Object | Body of the question |
| messageDTO.textMsg | String | Text Section of the question (<= 140 characters) |
| messageDTO.zipFileUri | String | S3 Uri of the zip file that contains all images & audio |


Response (JSON format)
Success 200

| Field  | Type  | Description  |
|---|---|---|
| meta  | Object  | HTTP request meta data object  |
| data | Object | Data object |
| data.msg | String | Description of the request status |
| data.question.id | String | Question ID |

Example
```
POST /questions
  {
      "subject": "math",
      "askedBy": "user1",
      "MessageDTO": {
          "textMsg": "123",
          "zipFileUri": "123.zip"
      }
  }

--> Response:
{
  "meta": {
    "timestamp": 1443039351,
    "version": "v1",
    "hostname": "localhost",
    "ip": "::1",
    "query": {
      "method": "POST",
      "url": "/questions"
    }
  },
  "data": {
    "msg": "Message has been successfully created and saved into the database.",
    "question": {
      "id": "5603087766f3578131e90938"
    }
  }
}
```

#### 2. Retrieve list of questions --> GET /questions
Parameter (JSON format)

| Field  | Type  | Description  |
|---|---|---|
| askedBy | String | Student's id |
| answeredBy | String | TA's id |
| id | String | Question's id|
| status | String | Question's state ('open', 'reopen', 'final', 'close', 'cancelled') |

Response (JSON format)
Success 200

| Field  | Type  | Description  |
|---|---|---|
| meta  | Object  | HTTP request meta data object  |
| data | Object | Data object |

Usage
```
1. GET /questions?id=5609e5d5aa81f503000e1455 ==> Retrieve a specific question with id=5609e5d5aa81f503000e1455

2. GET /questions?status=open ==> Retrieve all questions with status='open'

3. GET /questions?askedBy=testPerson ==> Retrieve all questions belong to student whose id='testPerson'

4. GET /questions?answeredBy=ta1 ==> Retrieve all questions belong to ta whose id='ta1'
```
