# Pipedream Actions

A repository of Pipedream actions. Currently to use them in your own workflow you
must clone and then use the CLI to deploy. See the [Pipedream quickstart](https://pipedream.com/docs/components/quickstart/nodejs/actions/) for information on how to 
do this. 

In the future, it will be simpler for a developer to deploy an action and I'll update the
readme at that time.

Currently I've got:

* [mrss](/mrss) - a multi-RSS action. It lets you specify multiple RSS URLs and all are fetched (currently in a sequential manner, I need to update it to be in parallel) and returns items merged and sorted by date.

