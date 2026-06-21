import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { getSiteConfig } from "@/features/shop/data/site-config";

const STEPS = [{ num: "1" }, { num: "2" }, { num: "3" }, { num: "4" }] as const;

export function OrderInstructions() {
  const { paypalEmail, discordInvite } = getSiteConfig();

  return (
    <section id="order-instruction" className="js-order-section">
      <h2 className="text-js-accent mb-2 flex items-center justify-center gap-2 text-[22px]">
        <Icon name="pin" size={22} />
        PAYPAL ONLY – SEND PAYMENT
      </h2>
      <p className="text-js-text-muted mb-2">
        Send payment via PayPal to the email below.
      </p>

      <div className="js-order-email-box">
        <div className="js-order-email-label">
          <Icon name="mail" size={14} />
          PayPal Email
        </div>
        <div className="text-js-accent text-2xl font-bold tracking-wide max-sm:text-lg">
          {paypalEmail}
        </div>
      </div>

      <p className={cn("text-js-text-dim mx-auto mb-4 max-w-xl text-sm")}>
        <span className="inline-flex items-start gap-1">
          <Icon
            name="triangle-alert"
            size={16}
            className="text-js-danger-soft mt-0.5 shrink-0"
          />
          <span className="text-left">
            For <strong>other payment methods</strong> (Crypto, Bank Transfer,
            etc.), open a ticket on Discord.
          </span>
        </span>
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {STEPS.map((step) => (
          <div key={step.num} className="js-step-card">
            <div className="text-js-accent text-2xl font-bold">{step.num}</div>
            <div className="text-js-text-muted mt-1 text-sm">
              {step.num === "1" && (
                <>
                  Send PayPal to
                  <br />
                  <strong className="text-js-accent">{paypalEmail}</strong>
                </>
              )}
              {step.num === "2" && (
                <>
                  Join our
                  <br />
                  <a
                    href={discordInvite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="js-text-link"
                  >
                    Discord server
                  </a>
                </>
              )}
              {step.num === "3" && (
                <>
                  Open a ticket
                  <br />
                  with payment proof{" "}
                  <small className="text-js-text-faint">(screenshot)</small>
                </>
              )}
              {step.num === "4" && (
                <>
                  Get your product
                  <br />
                  or tutorial
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <a
        id="discord-ticket"
        href={discordInvite}
        target="_blank"
        rel="noopener noreferrer"
        className="js-btn-discord"
      >
        <Icon name="message-circle" size={20} />
        JOIN DISCORD & OPEN TICKET
      </a>

      <p className="text-js-text-dim mt-4 text-sm">
        <span className="inline-flex items-start gap-1">
          <Icon
            name="triangle-alert"
            size={16}
            className="text-js-danger-soft mt-0.5 shrink-0"
          />
          <span className="text-left">
            <strong className="text-js-danger-soft">
              NO TICKET = NO DELIVERY
            </strong>
            <br />
            We only process orders through Discord tickets.
          </span>
        </span>
      </p>
    </section>
  );
}
