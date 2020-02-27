# Run Motors

## Introduction @unplugged

To learn how to drive your Kitronik Buggy we'll exercise the motors a bit. You will drive it forward and make it spin.

## Step 1

Got find the ``||kitronik_mini_motor:motor on||`` block in the ``||kitronik_mini_motor:Mini Motor||`` Toolbox drawer. Pull out two of those blocks and put tnem into an ``||input:on button A pressed||`` block.

```blocks
input.onButtonPressed(Button.A, function () {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 50)
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 50)
})
```

## Step 2

Set the motor number in the second ``||kitronik_mini_motor:motor on||`` to `2`.

```blocks
input.onButtonPressed(Button.A, function () {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 50)
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.clockwise, 50)
})
```

## Step 3

You'll run the buggy forward for `4` seconds so put in a ``||basic.pause||`` and set the time as `4000`. Turn of the motors right after that with a ``||kitronik_mini_motor:turn off all motors||``.

```blocks
input.onButtonPressed(Button.A, function () {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 50)
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.clockwise, 50)
    basic.pause(4000)
    kitronik_mini_motor.allOff()
})
```

## Step 4

Download your code and press button **A**. Observe the buggy drive forward for 4 seconds.

## Step 5

Go to the second ``||kitronik_mini_motor:motor on||`` block and change the `clockwise` parameter to `counter-clockwise`.

```blocks
input.onButtonPressed(Button.A, function () {
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor1, kitronik_mini_motor.MotorDirection.clockwise, 50)
    kitronik_mini_motor.motorOn(kitronik_mini_motor.Motors.Motor2, kitronik_mini_motor.MotorDirection.counterClockwise, 50)
    basic.pause(4000)
    kitronik_mini_motor.allOff()
})
```

## Step 6

Download your code again and press button **A**. Your buggy should spin clockwise for 4 seconds.
 
```package
pxt-kitronik-mini-motor=github:ganicke/pxt-kitronik-mini-motor
```
