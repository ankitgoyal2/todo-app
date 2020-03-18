const request = require('supertest');
const expect = require('expect');

const {app} = require('../server');
const {todoModel} = require('../models/todos');


beforeEach((done)=>{
    todoModel.deleteMany({}).then(()=>done())
        .catch((err)=>{ console.log('error in beforeEach '+err);});
})
describe('post  /todos',()=>{
    it(' should create a todo',(done)=>{
        var text = "test todo text";

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        })
        .end((err,res)=>{
            if(err){
                return done(err);
            }

            todoModel.find()
                .then((todos)=>{

                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                })
                .catch((err)=>{
                    return done(err);
                })
        })
    })


    it("should not create invalid todo",(done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        // .expect((res)=>{
        //     expect(res.body.text).toBe('');
        // })
        .end((err,res)=>{
            if(err)
                return done(err);
            

            todoModel.find()
                .then((res)=>{
                    expect(res.length).toBe(0);
                    done();
                })
                .catch((err)=> done(err))
        })
    })
})