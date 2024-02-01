-- DropForeignKey
ALTER TABLE "prompts_parameters" DROP CONSTRAINT "prompts_parameters_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "prompts_parameters" DROP CONSTRAINT "prompts_parameters_prompt_id_fkey";

-- DropForeignKey
ALTER TABLE "templates_parameters" DROP CONSTRAINT "templates_parameters_parameter_id_fkey";

-- DropForeignKey
ALTER TABLE "templates_parameters" DROP CONSTRAINT "templates_parameters_template_id_fkey";

-- AddForeignKey
ALTER TABLE "prompts_parameters" ADD CONSTRAINT "prompts_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "prompts_parameters" ADD CONSTRAINT "prompts_parameters_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "prompts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_parameters" ADD CONSTRAINT "templates_parameters_parameter_id_fkey" FOREIGN KEY ("parameter_id") REFERENCES "parameters"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "templates_parameters" ADD CONSTRAINT "templates_parameters_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
