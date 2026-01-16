import { IconTarget, IconPlus } from "@tabler/icons-react";

interface CompetenciesEmptyProps {
  onAdd?: () => void;
}

export function CompetenciesEmpty({ onAdd }: CompetenciesEmptyProps) {
  return (
    <div className="flex-1 bg-[#fcfcfd] flex flex-col overflow-hidden">
      <div className="flex flex-col gap-[16px] items-start p-[24px] flex-1 overflow-auto">
        {/* Header */}
        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full">
          <div className="content-stretch flex gap-[16px] items-center justify-between relative shrink-0 w-full">
            <h1 className="font-['Inter:Bold',sans-serif] font-bold leading-[30px] not-italic text-[#3d3c52] text-[22px]">Competencies</h1>
            <button
              onClick={onAdd}
              className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[16px] py-[10px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
            >
              <IconPlus className="size-[16px] text-white" stroke={2} />
              <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[14px] text-center text-nowrap text-white">Add competency</p>
            </button>
          </div>
          {/* Divider */}
          <div className="bg-[#ececf3] h-px shrink-0 w-full" />
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center w-full">
          <div className="flex flex-col items-center gap-[24px] max-w-[480px] text-center px-[24px]">
            <div className="bg-[#f0f0f5] rounded-full p-[24px]">
              <IconTarget className="size-[48px] text-[#6b697b]" stroke={2} />
            </div>
            <div className="flex flex-col gap-[12px]">
              <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] not-italic text-[#3d3c52] text-[20px]">
                No competencies yet
              </h2>
              <p className="font-['Inter:Regular',sans-serif] leading-[24px] not-italic text-[#6b697b] text-[16px]">
                Competencies define the skills and behaviors you'll evaluate across your organization. Create your first competency to get started with learner assessments.
              </p>
            </div>
            <div className="flex flex-col gap-[8px] w-full mt-[8px]">
              <button
                onClick={onAdd}
                className="bg-[#0975d7] content-stretch flex gap-[8px] items-center justify-center overflow-clip px-[24px] py-[12px] relative rounded-[4px] hover:bg-[#0861b8] transition-colors"
              >
                <IconPlus className="size-[20px] text-white" stroke={2} />
                <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic text-[16px] text-center text-nowrap text-white">Create your first competency</p>
              </button>
              <p className="font-['Inter:Regular',sans-serif] leading-[20px] not-italic text-[#6b697b] text-[14px] mt-[8px]">
                Minimum 3 competencies required for assessments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
