/**
 * Blocks for driving the Kitronik Mini Motor Board
 */
//% weight=100 color=#00A654 icon="\uf0fb" block="Mini Motor"
//% groups='["Motors","Servos","Steppers","Stop"]'
namespace kitronik_mini_motor {
    // Enum for the different motor rotation directions
    export enum MotorDirection {
        //% block="Clockwise"
        clockwise,
        //% block="Counter-Clockwise"
        counterClockwise
    }

    // Enum containing the different DC motor output options
    export enum Motors {
        //% block="motor 1"
        Motor1,
        //% block="motor 2"
        Motor2
    }

    // Enum containing the different Servo Pin output options
    export enum ServoPins {
        //% block="Pin 0"
        pin0,
        //% block="Pin 8"
        pin8
    }

    export let fullStepperSteps = 200 //Default value for the majority of stepper motors; can be altered via a block if neccessary for a particular stepper motor

	/**
     * Turns on a selected motor in the direction specified by MotorDirection, at the requested speed 
	 * @param motor which motor to turn on
	 * @param dir   which direction to go
	 * @param speed how fast to spin the motor, eg: 50
     */
    //% group="Motors"
    //% blockId=kitronik_mini_motor_on
    //% block="%motor|on direction %dir|speed %speed"
    //% speed.min=0 speed.max=100
    //% weight=100 blockGap=8
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        let OutputVal = pins.map(speed, 0, 100, 0, 1023);

        switch (motor) {
            case Motors.Motor1: /*Motor 1 uses Pins 13 and 14*/
                switch (dir) {
                    case MotorDirection.counterClockwise:
                        pins.analogWritePin(AnalogPin.P13, OutputVal);
                        pins.digitalWritePin(DigitalPin.P14, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.clockwise:
                        pins.analogWritePin(AnalogPin.P14, OutputVal);
                        pins.digitalWritePin(DigitalPin.P13, 0);
                        break
                }

                break;
            case Motors.Motor2: /*Motor 2 uses Pins 15 and 16*/
                switch (dir) {
                    case MotorDirection.counterClockwise:
                        pins.analogWritePin(AnalogPin.P15, OutputVal);
                        pins.digitalWritePin(DigitalPin.P16, 0); /*Write the low side digitally, to allow the 3rd PWM to be used if required elsewhere*/
                        break
                    case MotorDirection.clockwise:
                        pins.analogWritePin(AnalogPin.P16, OutputVal);
                        pins.digitalWritePin(DigitalPin.P15, 0);
                        break
                }

                break;
        }
    }

    /**
     * Set the number of steps per full rotation for a stepper motor (motorSteps is defaulted to 200)
     * @param steps number of steps for a full rotation, eg: 200
     */
    //% group="Steppers"
    //% blockId=kitronik_mini_motor_set_stepper_steps
    //% block="stepper has %steps|steps in one full rotation"
    //% weight=90 blockGap=8
    export function setStepperMotorSteps(steps: number): void {
        fullStepperSteps = steps
    }

    /**
     * Sets the requested stepper motor to a chosen angle relative to the start position.
     * @param dir   which direction to go
     * @param angle how far to turn the motor relative to start, eg: 1
     * @param speed how fast to spin the motor, eg: 50
     */
    //% group="Steppers"
    //% blockId=kitronik_mini_motor_stepper_motor_turn_angle
    //% block="stepper turn %dir|%angle|degrees speed %speed"
    //% weight=95 blockGap=8
    //% angle.min=1 angle.max=360
    //% speed.min=1 speed.max=100
    export function stepperMotorTurnAngle(dir: MotorDirection, angle: number, speed: number): void {
        let angleToSteps = 0
        let delay = pins.map(speed, 1, 100, 80, 1)

        //convert angle to motor steps
        angleToSteps = pins.map(angle, 1, 360, 1, fullStepperSteps)

        turnStepperMotor(dir, angleToSteps, delay)
    }

    /**
     * Sets the requested stepper motor to turn a set number of steps.
     * @param dir   which direction to go
     * @param stepperSteps how many steps to turn the motor
     * @param speed how fast to spin the motor, eg: 50
     */
    //% group="Steppers"
    //% blockId=kitronik_mini_motor_stepper_motor_turn_steps
    //% block="stepper turn %dir|%steps|steps speed %speed"
    //% weight=100 blockGap=8
    //% speed.min=1 speed.max=100
    export function stepperMotorTurnSteps(dir: MotorDirection, stepperSteps: number, speed: number): void {
        let delay = pins.map(speed, 1, 100, 80, 1)
        turnStepperMotor(dir, stepperSteps, delay)
    }

    // The function called to actually turn the stepper motor a set number of steps
    // This function uses a finite state machine (stepStage) to set each motor output to energise the coils of the stepper motor
    // in the correct sequence in order to continuously drive the stepper motor in a set direction
    // Each stepStage value (1-4) corresponds to particular motor outputs and directions being active (for either stepper output)
    function turnStepperMotor(dir: MotorDirection, steps: number, stepperDelay: number): void {
        let stepCounter = 0
        let stepStage = 1 //stepStage determines which coils in the stepper motor will be energised (order is very important to ensure actual turning)
        let currentDirection = 0
        let currentMotor = 0

        // Loop to run until the number of motor steps set by the user is reached
        while (stepCounter < steps) {
            // This section uses the current stepStage to set which Motor Output should be used
            if (stepStage == 1 || stepStage == 3) {
                currentMotor = Motors.Motor1
            }
            else {
                currentMotor = Motors.Motor2
            }

            // This section uses the current stepStage to set which direction the Motor Output should be driven
            if (stepStage == 1 || stepStage == 4) {
                currentDirection = MotorDirection.counterClockwise
            }
            else {
                currentDirection = MotorDirection.clockwise
            }

            // Function call for the motor drive with the previously set currentMotor and currentDirection
            motorOn(currentMotor, currentDirection, 100)
            // Delay between each step (1ms - 80ms) determined by the user by setting the speed 0-100%
            basic.pause(stepperDelay)

            // This section progresses the stepStage depending on the motor direction previous stepStage
            switch (dir) {
                case MotorDirection.counterClockwise:
                    if (stepStage == 4) {
                        stepStage = 1
                    }
                    else {
                        stepStage += 1
                    }
                    break
                case MotorDirection.clockwise:
                    if (stepStage == 1) {
                        stepStage = 4
                    }
                    else {
                        stepStage -= 1
                    }
                    break
            }
            stepCounter += 1
        }
    }

    /**
     * Sets servo to a specific angle (for 180 deg servos) or rotation speed (360 deg servos)
     * @param servoPin the output pin to which the servo is connected
     * @param angle angle/speed for servo to turn to/at eg: 90
     */
    //% group="Servos"
    //% blockId=kitronik_mini_motor_servo_on
    //% block="turn servo on %servoPin|to %angle"
    //% angle.min=0 angle.max=180
    //% weight=100 blockGap=8
    export function servoTurn(servoPin: ServoPins, angle: number): void {
        let currentServo = 0
        if (servoPin == ServoPins.pin0) {
            currentServo = AnalogPin.P0
        }
        else if (servoPin == ServoPins.pin8) {
            currentServo = AnalogPin.P8
        }
        pins.servoWritePin(currentServo, angle)
    }

	/**
     * Turns off the selected motor
     * @param motor which motor to turn off
     */
    //% group="Motors"
    //% blockId=kitronik_mini_motor_off
    //% block="turn off %motor"
    //% weight=95 blockGap=8
    export function motorOff(motor: Motors): void {
        switch (motor) {
            case Motors.Motor1:
                pins.digitalWritePin(DigitalPin.P13, 0);
                pins.digitalWritePin(DigitalPin.P14, 0);
                break
            case Motors.Motor2:
                pins.digitalWritePin(DigitalPin.P15, 0);
                pins.digitalWritePin(DigitalPin.P16, 0);
                break
        }
    }

    /**
     * Turns off all Motor & Servo outputs
     */
    //% group="Stop"
    //% blockId=kitronik_mini_all_off
    //% block="turn off all motors & servos"
    //% weight=100 blockGap=8
    export function allOff(): void {
        pins.digitalWritePin(DigitalPin.P0, 0);
        pins.digitalWritePin(DigitalPin.P8, 0);
        pins.digitalWritePin(DigitalPin.P13, 0);
        pins.digitalWritePin(DigitalPin.P14, 0);
        pins.digitalWritePin(DigitalPin.P15, 0);
        pins.digitalWritePin(DigitalPin.P16, 0);
    }
} 