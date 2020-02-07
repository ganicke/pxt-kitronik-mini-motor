// go round
input.onButtonPressed(Button.A, () => {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.counterClockwise, 100);
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.clockwise, 100);
})
// go forward
input.onButtonPressed(Button.B, () => {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 100);
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.counterClockwise, 100);
})
// stop
input.onButtonPressed(Button.AB, () => {
    kitronik_mini_motor.motorOff(kitronik_mini_motor.Motors.Motor1);
    kitronik_mini_motor.motorOff(kitronik_mini_motor.Motors.Motor2);
})
 