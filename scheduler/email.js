const Task=require('../models/task.model');
const User=require('../models/users.model');
let nodemailer = require('nodemailer');
//const config= require('config');
const { scheduler_email,scheduler_password } = require("../config/config");
const myID = scheduler_email
const myPassword = scheduler_password

module.exports=function(){
        //console.log("from email.js")
        try{
        Task.find({},(err,tasks)=>{
            if(err) throw Error('cannot iterate task database')

            const cur_d= new Date()
            const cur_month = parseInt(cur_d.getMonth() + 1)
            const cur_day = parseInt(cur_d.getDate())
            const cur_year = parseInt(cur_d.getFullYear())
            const cur_hrs = parseInt(cur_d.getHours())
            const cur_min= parseInt(cur_d.getMinutes()) 
            //console.log(`year:${cur_year}, month:${cur_month}, day:${cur_day}`)

            tasks.map(task=>{
                
                const d= new Date(task.day)
                const month = parseInt(d.getMonth() + 1)
                const day = parseInt(d.getDate())
                const year = parseInt(d.getFullYear())
                const hrs = parseInt(d.getHours())
                const min= parseInt(d.getMinutes()) 
                //console.log(`year:${year}, month:${month}, day:${day}`)

                if(task.reminder){
                    if(cur_year===year && cur_month===month && cur_day===day && cur_hrs===hrs){
                        if(min-cur_min===2){
                            try{
                                //var id= task.userId.valueOf()
                                //console.log(id)
                                User.find({},(err,users)=>{
                                    if(err) throw Error('cannot iterate user database')

                                    users.map(user=>{
                                        if(user._id.equals(task.userId)){
                                                        var h=''+hrs
                                                        var m = ''+min
                                                        if(h.length<2) h='0'+h
                                                        if(m.length<2) m='0'+m

                                                        dayupd=''+day
                                                        monthupd=''+month
                                                        if(dayupd.length<2) dayupd='0'+dayupd
                                                        if(monthupd.length<2) monthupd='0'+monthupd
                                                        
                                                        const ti= [h,m].join(':')
                                                        const da = ''+ [dayupd,monthupd,year].join('/')

                                                        const message = `
                                                        <h3>Hi ${(user.name).split(' ')[0]},</h3> 
                                                        <p>
                                                        You have the following task - <b>${task.text} </b>
                                                        to be done on <b>${da}</b> at <b>${ti} hrs</b> .<br><br>
                                                        Thanks and regards.
                                                        <br><br><br><br><br>
                                                        * Please do not send reply to this e-mail *
                                                        </p>
                                                        `;
                                                        //console.log(user)

                                                        let mailOptions = {
                                                            from: `"Task Scheduler" ${myID}`,
                                                            to: user.email,
                                                            subject: 'Reminder for upcoming task!',
                                                            html: message
                                                    };
                                                    let transporter = nodemailer.createTransport({
                                                        service: 'gmail',
                                                        auth: {
                                                        user: myID,
                                                        pass: myPassword
                                                        }
                                                    });
                                                    transporter.sendMail(mailOptions, function(error, info){
                                                        if (error) {
                                                        console.log(error);
                                                        } else {
                                                        console.log('Email sent: ' + info.response);
                                                        }
                                                    });
                                        }
                                    })
                                })

                            }catch(err){
                                console.log(err);
                            }
                        }
                    }
                }
            })
        }
        )}catch(err){
            console.log(err)
        }
}




