import { Icon } from "@/components/icons/Icon";
import { cn } from "@/lib/cn";
import { getSiteConfig } from "@/features/shop/data/site-config";

const STEPS = [{ num: "1" }, { num: "2" }, { num: "3" }, { num: "4" }] as const;

type OrderInstructionsProps = {
  stripeEnabled: boolean;
};

export function OrderInstructions({ stripeEnabled }: OrderInstructionsProps) {
  const { paypalEmail, discordInvite } = getSiteConfig();

  return (
    <section id="order-instruction" className="js-order-section">
      <h2 className="text-js-accent mb-2 flex items-center justify-center gap-2 text-[22px]">
        <Icon name="pin" size={22} />
        CHOOSE YOUR PAYMENT METHOD
      </h2>
      <p className="text-js-text-muted mb-4">
        Pay with PayPal (manual transfer) or Stripe (card at checkout). Then
        open a Discord ticket to receive your order.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="js-order-email-box">
          <div className="js-order-email-label">
            <Icon name="mail" size={14} />
            PayPal
          </div>
          <p className="text-js-text-muted mb-2 text-sm">
            Send payment to this email:
          </p>
          <div className="text-js-accent text-xl font-bold tracking-wide max-sm:text-lg">
            {paypalEmail}
          </div>
        </div>

        {stripeEnabled && (
          <div className="js-order-email-box">
            <div className="js-order-email-label">
              <Icon name="plug" size={14} />
              Stripe
            </div>
            <p className="text-js-text-muted text-sm">
              Select <strong className="text-js-accent">Stripe (card)</strong>{" "}
              when you click Buy on any product or tutorial. You will be
              redirected to secure checkout.
            </p>
          </div>
        )}
      </div>

      <p className={cn("text-js-text-dim mx-auto mb-4 max-w-xl text-sm")}>
        <span className="inline-flex items-start gap-1">
          <Icon
            name="triangle-alert"
            size={16}
            className="text-js-danger-soft mt-0.5 shrink-0"
          />
          <span className="text-left">
            For <strong>other payment methods</strong> (crypto, bank transfer,
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
                  Pay via PayPal to
                  <br />
                  <strong className="text-js-accent">{paypalEmail}</strong>
                  {stripeEnabled && (
                    <>
                      <br />
                      <span className="text-js-text-faint">
                        or Stripe at checkout
                      </span>
                    </>
                  )}
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
                  with PayPal proof{" "}
                  <small className="text-js-text-faint">(screenshot)</small>
                  {stripeEnabled && (
                    <>
                      <br />
                      or Stripe Session ID
                    </>
                  )}
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
