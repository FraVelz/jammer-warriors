import { Icon } from "@/components/icons/Icon";

export function LegalWarning() {
  return (
    <div className="js-legal-warning" role="alert">
      <Icon
        name="triangle-alert"
        size={20}
        className="text-js-danger mt-0.5 shrink-0"
      />
      <div>
        <p className="text-js-danger flex items-center gap-2 font-bold">
          <Icon name="zap" size={16} className="text-js-danger" />
          LEGAL WARNING
        </p>
        <p className="mt-1">
          Jammers may be illegal in your country. You are 100% responsible for
          your local laws. These are sold for{" "}
          <strong className="text-js-danger-soft">
            educational and testing purposes only
          </strong>
          .
        </p>
      </div>
    </div>
  );
}
