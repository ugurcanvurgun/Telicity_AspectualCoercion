PennController.ResetPrefix(null) // Shorten command names (keep this line here)

// Show the 'intro' trial first, then all the 'experiment' trials in a random order
// then send the results and finally show the trial labeled 'bye'

Sequence("intro","instructions", "transition", randomize("test"),SendResults(),"bye")

newTrial( "intro" ,
    newText("<p style=font-size:18px;>Welcome to our study!</p>" +
            "<p style=font-size:18px;>Press Enter to go full screen and begin!:</p>")
        .center()
        .print()
    ,
    newVar("ID")
        .global()
        .set(GetURLParameter("survey_code"))
    ,
    newKey("Enter","ENTER")
        .wait()
    ,
    fullscreen()
).setOption("hideProgressBar",true)
.log("ID", getVar("ID"))

Template("instructions.csv" ,
    row => newTrial( "instructions" ,
        newImage("instrSlide", "https:"+ row.InstrURL)
            .size(900,506)
            .center()
            .print()
        ,
        newText("Space1","<p style=font-size:22px;>Press <strong>Space</strong> to continue.</p>")
            .center()
            .print()
        ,        
        newKey("SpaceKey1", " ")
            .wait()
        ,
        getText("Space1")
            .remove()
        ,
        getImage("instrSlide")
            .remove()
        ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID")))

newTrial("transition",
    newText("transitiontext", "<p style=font-size:30px;>Let's get started! Here comes the first one.</p>")
    ,
    newCanvas("transitioncanvas", 1366, 550)
        .add("center at 50%", "center at 45%", getText("transitiontext"))
        .center()
        .print()
    ,
    newTimer("transitiontimer", 4000)
        .start()
        .wait()
    ,
    getCanvas("transitioncanvas")
        .remove(getText("transitiontext"))
).setOption("hideProgressBar",true)
    .log("ID", getVar("ID"))

Template("test.csv" ,
    row => newTrial("test"
,
    //Show Video
    newVideo("eventTest", "https:" + row.URL)
        .size(703,398)
        .disable(0.01)
,
    newText("testcontext","<p style=font-size:30px;> Exercise: " +row.Context+"</p>")
,
    newCanvas("testcanv",1366, 550)
        .add("center at 50%","center at 40%", getText("testcontext"))
        
        .center()
        .print()
,
    newTimer("wait", 6500)
        .start()
        .wait()
,

    getCanvas("testcanv")
        .remove(getText("testcontext"))
        .add("center at 50%","center at 50%", getVideo("eventTest"))
        .refresh()
,
/*    newButton("testvideo","Play")
        .center()
        .print()
        .log()
        .wait()
,       
    getButton("testvideo")
        .remove()
,*/
    getVideo("eventTest")
            .center()
            .play()
            .log()
,

    getVideo("eventTest")
        .wait()
,
/*  newButton("SendTest","Done")
        .center()
        .print()
        .wait()
,
    getButton("SendTest")
        .remove()
,*/
    getCanvas("testcanv")
        .remove()
,
    newButton("yesbutton1", "Yes")
,
    newButton("nobutton1", "No")
,
    newText("testcontextreminder","<p style=font-size:30px;> " +row.ContextReminder+"</p>")
,
    newCanvas("TestQ",1600, 566)
        .add(70, 110, getText("testcontextreminder"))
        .add(70, 300, newText("TQ1","<p style=font-size:29px;>Her time is up. Did Ebony do the exercise?</p>"))
        .add("center at 25%", "center at 75%", getButton("yesbutton1"))
        .add("center at 75%", "center at 75%", getButton("nobutton1"))
        .print()
,
    newSelector("selector1")
        .add(getButton("yesbutton1"))
        .add(getButton("nobutton1"))
        .wait()
        .log()
,
    getCanvas("TestQ")
        .add("center at 50%", "center at 85%", newButton("TQ1Next", "Next").print())
,
    getButton("TQ1Next")
        .wait()
,
    newButton("yesbutton2", "Yes")
,
    newButton("nobutton2", "No")
,

    getCanvas("TestQ",1600, 600)
        .remove(getText("testcontextreminder"))
        .remove(getText("TQ1"))
        .remove(getButton("yesbutton1"))
        .remove(getButton("nobutton1"))
        .remove(getButton("TQ1Next"))
        .add("center at 50%","center at 50%",newText("TQ2","<p style=font-size:29px;>Any glitch in the video?</p>"))
        .add("center at 25%", "center at 70%", getButton("yesbutton2"))
        .add("center at 75%", "center at 70%", getButton("nobutton2"))
        .print()
,
    newSelector("selector2")
        .add(getButton("yesbutton2"))
        .add(getButton("nobutton2"))
        .wait()
        .log()
,
    getCanvas("TestQ")
        .add("center at 50%", "center at 85%", newButton("TQ2Next", "Next").print())
,
    getButton("TQ2Next")
        .wait()


    ).setOption("hideProgressBar",true)
    .log("ID", getVar("ID"))
    .log("Condition", row.Condition)
    .log("Group",row.Group)
    .log("Item", row.Item)
    .log("Content", row.Content)
    .log("Type", row.Type)
    .log("Interruption", row.Interruption)
    .log("CorrectResp1", row.CorrectResp1)
    .log("CorrectResp2", row.CorrectResp2)
    .log("Context", row.Context)
    .log("Experiment", row.Experiment)) 


newTrial( "bye" ,
    newText("<p style=font-size:18px;>Your results have been saved, but you need to validate your participation below. This is a necessary step to approve your submission!</p>" +
			"<p style=font-size:18px;><a href='https://app.prolific.co/submissions/complete?cc=68CAA119'>Click here to confirm my submission on Prolific</a>.</p>")
		.center()
        .print()
		.wait()
).setOption("hideProgressBar",true)
PennController.DebugOff()