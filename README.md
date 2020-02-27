# pxt-kitronik-mini-motor

Custom blocks for www.kitronik.co.uk/5679 Mini Motor Driver for BBC micro:bit.

The blocks in this extension are split into four groups:

## Motors

The ``||motorOn||`` block turns on a selected motor (1 or 2)
to run either clockwise or counter-clockwise at a speed specified from 0-100%.

```blocks
input.onButtonPressed(Button.A, function () {
    let mini_motor: kitronik_mini_motor = null
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 100)
})
```

The ``||kitronik_mini_motor.motorOff||`` block switches off the selected motor output (1 or 2).

```blocks
kitronik_mini_motor.motorOff(kitronik_mini_motor.Motors.Motor1)
```

## Servos

The ``||kitronik_mini_motor.servoTurn||`` block sets a servo (connected to either Pin 0 or Pin 8)
to a particular angle (0 to 180). For 180 degree servos, this will be the angle they move to, and 
for continuous rotation servos, the 'angle' will set the direction and speed of rotation 
(90 to 0 is 0-100% speed in one direction, and 90 to 180 is 0-100% speed in the other direction).

```blocks
kitronik_mini_motor.servoTurn(kitronik_mini_motor.ServoPins.pin0, 90)
```

## Stepper Motors

The ``||kitronik_mini_motor.stepperMotorTurnSteps||`` block will set a stepper motor to turn a specified
number of steps (1 to 200 default), either clockwise or counter-clockwise, at a speed set from 0-100%.

```blocks
kitronik_mini_motor.stepperMotorTurnSteps(kitronik_mini_motor.MotorDirection.clockwise, 100, 50)
```

The ``||kitronik_mini_motor.stepperMotorTurnAngle||`` blok will set a stepper motor to turn a specified angle
(1 to 360), either clockwise or counter-clockwise, at a speed set from 0-100%.

```blocks
kitronik_mini_motor.stepperMotorTurnAngle(kitronik_mini_motor.MotorDirection.counterClockwise, 180, 65)
```

The ``||kitronik_mini_motor.setStepperMotorSteps||`` block allows the default number of steps for a stepper motor (200)
to be changed, if a stepper motor is used which has a different number of steps in one complete rotation.

```blocks
kitronik_mini_motor.setStepperMotorSteps(400)
```

## Stop

The ``||kitronik_mini_motor.allOff||`` block turns off all the motor and servo outputs on the Mini Motor board.

```blocks
kitronik_mini_motor.allOff()
```

## License

MIT

## Supported targets

* for PXT/microbit

<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

