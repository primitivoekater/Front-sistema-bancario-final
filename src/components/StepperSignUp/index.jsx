import { Box, Stepper, Step, StepLabel, Typography } from "@mui/material";
import "./styles.css";

const steps = [
  {
    label: "Cadastra-se",
    sublabel: "Por favor, escreva seu nome e e-mail",
  },
  {
    label: "Escolha uma senha",
    sublabel: "Escolha uma senha segura",
  },
  {
    label: "Cadastro realizado com sucesso",
    sublabel: "E-mail e senha cadastrados com sucesso",
  },
];

export default function StepperSignUp({ activeStep, setActiveStep }) {
  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                <Typography className="progress__subStep" variant="caption">
                  {step.sublabel}
                </Typography>
              }
            >
              <Typography className="progress__step">{step.label}</Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
