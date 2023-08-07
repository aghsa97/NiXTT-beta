export class RequiresProPlanError extends Error {
  constructor(message = "This action requires a pro plan subscription.") {
    super(message);
  }
}
