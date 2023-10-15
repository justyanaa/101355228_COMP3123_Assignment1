const express = require('express');
const router = express.Router()

const EmplModel = require('../models/EmployeeModel')
const UserModel = require('../models/UserModel')

//Allow user to create new account
//http://localhost:8081/api/v1/user/signup
router.post('/user/signup', async (req, res) => {
    
    try{
        const newUser = new UserModel({
            ...req.body
        })

        await newUser.save() 
        res.status(201).send({
            message: "User successfully created",
            newUser
        })
    }catch(err){
        res.status(500).json({
            message: "User not successful created",
            error: err.message
        })
    }

})

//Allow user to access the system
//http://localhost:8081/api/v1/user/login
router.post('/user/login', async (req, res) => {
    
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(500).send({
            message: "Username or Password not present"
        })
    }

    try{
        const user = await UserModel.findOne({username, password})

        if (!user) {
            res.status(401).send({
              message: "Login not successful",
              error: "Invalid Username or password",
            })
          } else {
            res.status(200).send({
              message: "Login successful",
              username: user.username
            })
          }

    }catch(err){
        res.status(500).send({
            error: err.message
          })
    }

})

//User can get all employee list
//http://localhost:8081/api/v1/emp/employees
router.get('/emp/employees', async (req, res) => {
    
    try{
        const emplList = await EmplModel.find({})
        res.status(200).send(emplList)
    }catch(error){
        res.status(500).send(error)
    }

})

//User can create new employee
//http://localhost:8081/api/v1/emp/employees
router.post('/emp/employees', async (req, res) => {
    try{
        const newEmp = new EmplModel({
            ...req.body
        })

        await newEmp.save() 
        res.status(201).send({
            message: "Employee successfully created",
            newEmp
        })
    }catch(err){
        res.status(500).send({
            message: "Employee not successful created",
            error: err.message
        })
    }
})

//User can get employee details by employee id
//http://localhost:8081/api/v1/emp/employees/
router.get('/emp/employees/:eid', (req, res) => {
    
    const empId = req.params.eid;

    EmplModel.findById(empId)
        .then(emp => {
            if (!emp) {
                res.status(500).send({
                    message: "Employee not found"
                });
            } else {
                res.status(200).send({
                    first_name: emp.first_name,
                    last_name: emp.last_name,
                    email: emp.email,
                    gender: emp.gender,
                    salary: emp.salary
                  })
            }
        })

        .catch(error => {
            res.status(500).send({
                error: error.message
            });
        });

})

//User can update employee details
//http://localhost:8081/api/v1/emp/employees/
router.put('/emp/employees/:eid', async (req, res) => {

    const empId = req.params.eid;
    const updatedContent = req.body;

    try {
        const updatedEmp = await EmplModel.findByIdAndUpdate(
            empId,
            updatedContent,
            { new: true } 
        );

        if (!updatedEmp) {
            return res.status(500).send({
                message: "Employee not found"
            });
        }

        res.status(200).send(updatedEmp);

    } catch (err) {
        res.status(500).send({
            message: "An error occurred while updating the Employee",
            error: err.message
        });
    }
})

//User can delete employee by employee id
//http://localhost:8081/api/v1/emp/employees?eid=xxx
router.delete('/emp/employees', async (req, res) => {
    const empId = req.query.eid; // Assuming eid is passed as a query parameter

    try {
        const emp = await EmplModel.findByIdAndDelete(empId);

        if (!emp) {
            return res.status(404).send({ message: "Employee Not Found" });
        }

        return res.status(204).send({
            message: "Deleted successfully",
            emp
        });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
});

module.exports = router;


