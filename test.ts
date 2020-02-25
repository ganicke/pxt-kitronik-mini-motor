/* 
Operation of test file:

At startup, a servo connected to Pin 0 is set to 90 degrees.
In the forever loop, the servo will move from 0 to 180 degrees, pausing at each end for 1 second.
If Button A is pressed, Motor 1 will turn clockwise at 100% speed, and Motor 2 counter-clockwise at 25% speed.
If Button B is pressed, a stepper motor will turn 76 steps clockwise at 50% speed.
If Buttons A & B are pressed together, both Motor outputs will turn off
*/
input.onButtonPressed(Button.A, function () {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 100)
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.counterClockwise, 25)
})
input.onButtonPressed(Button.B, function () {
    kitronik_mini_motor.stepperMotorTurnSteps(kitronik_mini_motor.MotorDirection.clockwise, 76, 50)
})
input.onButtonPressed(Button.AB, function () {
    kitronik_mini_motor.motorOff(kitronik_mini_motor.Motors.Motor1)
    kitronik_mini_motor.motorOff(kitronik_mini_motor.Motors.Motor2)
})
kitronik_mini_motor.servoTurn(kitronik_mini_motor.ServoPins.pin0, 90)
basic.forever(function () {
    kitronik_mini_motor.servoTurn(kitronik_mini_motor.ServoPins.pin0, 0)
    basic.pause(1000)
    kitronik_mini_motor.servoTurn(kitronik_mini_motor.ServoPins.pin0, 180)
    basic.pause(1000)
})
 